import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getPokemonList, getPokemonDetail, searchPokemon } from '../api/pokemonApi';
import { PokemonDetail, SortOption } from '../models/types';

interface PokemonContextType {
  pokemonList: PokemonDetail[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  sortOption: SortOption | null;
  fetchPokemon: (page?: number) => Promise<void>;
  searchPokemonByName: (name: string) => Promise<void>;
  sortPokemon: (option: SortOption) => void;
  resetFilters: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption | null>(null);

  const ITEMS_PER_PAGE = 16;

  const fetchPokemon = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      
      const data = await getPokemonList(ITEMS_PER_PAGE, offset);
      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
      
      const detailPromises = data.results.map(pokemon => 
        getPokemonDetail(pokemon.name)
      );
      
      const pokemonDetails = await Promise.all(detailPromises);
      setPokemonList(pokemonDetails);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const searchPokemonByName = async (name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSearchQuery(name);
      
      if (!name.trim()) {
        return fetchPokemon(1);
      }
      
      const results = await searchPokemon(name);
      setPokemonList(results);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const sortPokemon = (option: SortOption) => {
    setSortOption(option);
    
    const sorted = [...pokemonList].sort((a, b) => {
      let valueA: number | string;
      let valueB: number | string;
      
      switch (option.field) {
        case 'name':
          valueA = a.name;
          valueB = b.name;
          break;
        case 'hp':
          valueA = a.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0;
          valueB = b.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0;
          break;
        case 'attack':
          valueA = a.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0;
          valueB = b.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0;
          break;
        case 'speed':
          valueA = a.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0;
          valueB = b.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0;
          break;
        default:
          return 0;
      }
      
      if (option.direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    setPokemonList(sorted);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSortOption(null);
    fetchPokemon(1);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const value = {
    pokemonList,
    isLoading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    sortOption,
    fetchPokemon,
    searchPokemonByName,
    sortPokemon,
    resetFilters
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};