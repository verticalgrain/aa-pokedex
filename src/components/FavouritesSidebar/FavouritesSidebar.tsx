import clsx from 'clsx';
import { X, PanelRightOpen, PanelRightClose } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDroppable } from '@dnd-kit/core';
import { useFavouritesContext } from '../../context/FavouritesContext';
import { formatPokemonName } from '../../utils/utils';
import styles from './FavouritesSidebar.module.scss';

export default function FavouritesSidebar() {
  const { favourites, removeFavourite, isFavouritesSidebarOpen, setIsFavouritesSidebarOpen } = useFavouritesContext();
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'favourites-droppable',
  });

  const sidebarStyles = clsx(
    styles.sidebar,
    isFavouritesSidebarOpen ? styles.open : styles.closed,
    isOver && styles.isOver,
  )

  const contentStyles = clsx(
    styles.content,
    isOver && styles.isOver,
  )

  return (
    <div 
      ref={setNodeRef}
      className={sidebarStyles}
    >
      <div className={styles.toggleButton} onClick={() => setIsFavouritesSidebarOpen(prev => !prev)}>
        {isFavouritesSidebarOpen ? 
          <PanelRightClose /> 
        : 
          <PanelRightOpen />  
        }
      </div>
      
      <div className={contentStyles}>
        <h2 className={styles.title}>Favourites</h2>
        
        {favourites.length === 0 ? (
          <p className={styles.emptyMessage}>
            Drag and drop Pokémon here to add to favourites
          </p>
        ) : (
          <ul className={styles.favouritesList}>
            {favourites.map(pokemon => (
              <li key={pokemon.id} className={styles.favouriteItem}>
                <Link to={`/pokemon/${pokemon.id}`} className={styles.favouriteLink}>
                  <img 
                    src={pokemon.image} 
                    alt={formatPokemonName(pokemon.name)} 
                    className={styles.favouriteImage} 
                  />
                  <span className={styles.favouriteName}>
                    {formatPokemonName(pokemon.name)}
                  </span>
                </Link>
                <button 
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFavourite(pokemon.id);
                  }}
                  aria-label={`Remove ${formatPokemonName(pokemon.name)} from favourites`}
                >
                  <X size="16" strokeWidth={3} color="var(--color-alert)" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
