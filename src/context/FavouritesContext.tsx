import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FavouritePokemon } from '../models/types';

interface FavouritesContextType {
  favourites: FavouritePokemon[];
  addFavourite: (pokemon: FavouritePokemon) => void;
  removeFavourite: (id: number) => void;
  isFavourite: (id: number) => boolean;
  isFavouritesSidebarOpen: boolean;
  setIsFavouritesSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const STORAGE_KEY = 'pokemonFavourites';

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
  const [isFavouritesSidebarOpen, setIsFavouritesSidebarOpen] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<FavouritePokemon[]>(() => {
    try {
      const storedFavourites = localStorage.getItem(STORAGE_KEY);
      return storedFavourites ? JSON.parse(storedFavourites) : [];
    } catch (error) {
      console.error('Error loading favourites from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites to localStorage:', error);
    }
  }, [favourites]);

  const addFavourite = (pokemon: FavouritePokemon) => {
    if (!isFavourite(pokemon.id)) {
      const newFavourites = [...favourites, pokemon];
      setFavourites(newFavourites);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavourites));
      } catch (error) {
        console.error('Error saving favourite to localStorage:', error);
      }
    }
  };

  const removeFavourite = (id: number) => {
    const newFavourites = favourites.filter(pokemon => pokemon.id !== id);
    setFavourites(newFavourites);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavourites));
    } catch (error) {
      console.error('Error removing favourite from localStorage:', error);
    }
  };

  const isFavourite = (id: number) => {
    return favourites.some(fav => fav.id === id);
  };

  return (
    <FavouritesContext.Provider value={{ 
      favourites, 
      addFavourite, 
      removeFavourite, 
      isFavourite,
      isFavouritesSidebarOpen,
      setIsFavouritesSidebarOpen
    }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavouritesContext = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavouritesContext must be used within a FavouritesProvider');
  }
  return context;
};