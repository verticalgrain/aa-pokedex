import { useState } from 'react';
import clsx from 'clsx';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import PokemonList from '../../components/PokemonList/PokemonList';
import SearchBar from '../../components/SearchBar/SearchBar';
import FavouritesSidebar from '../../components/FavouritesSidebar/FavouritesSidebar';
import { useFavouritesContext } from '../../context/FavouritesContext';
import { FavouritePokemon } from '../../models/types';
import PokemonCardPreview from '../../components/PokemonCardPreview/PokemonCardPreview';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const { addFavourite, isFavouritesSidebarOpen } = useFavouritesContext();
  const [draggingPokemon, setDraggingPokemon] = useState<FavouritePokemon | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current) {
      setDraggingPokemon(active.data.current.pokemon);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    
    if (event.activatorEvent instanceof MouseEvent) {
      event.activatorEvent.preventDefault();
    }

    if (over && over.id === 'favourites-droppable' && active.data.current) {
      const pokemonData = active.data.current.pokemon;
      addFavourite(pokemonData);
    }

    setDraggingPokemon(null);
  };

  const homepageContainerStyles = clsx(
    styles.container,
    isFavouritesSidebarOpen && styles.containerRightMargin
  )

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <FavouritesSidebar />
      <div className={styles.background}>
        <div className={homepageContainerStyles}>
          <h1 className="sr-only">Pokémon Collection</h1>
          <SearchBar />
          <PokemonList />
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {draggingPokemon ? (
          <PokemonCardPreview pokemon={draggingPokemon} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}