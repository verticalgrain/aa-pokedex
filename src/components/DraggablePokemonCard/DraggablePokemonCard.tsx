import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { Grip } from 'lucide-react';
import { PokemonDetail } from '../../models/types';
import { formatPokemonName } from '../../utils/utils';
import { useFavouritesContext } from '../../context/FavouritesContext';
import styles from './DraggablePokemonCard.module.scss';
import { Link } from 'react-router-dom';

interface DraggablePokemonCardProps {
  pokemon: PokemonDetail;
}

export default function DraggablePokemonCard({ pokemon }: DraggablePokemonCardProps) {
  const formattedName = formatPokemonName(pokemon.name);
  const { isFavourite } = useFavouritesContext();
  const isCurrentFavourite = isFavourite(pokemon.id);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `pokemon-${pokemon.id}`,
    data: {
      pokemon: {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
      }
    }
  });

  const cardWrapperStyles = clsx(
    styles.cardWrapper,
    isDragging && styles.isDragging,
  );

  const cardStyles = clsx(
    styles.card,
    isCurrentFavourite && styles.cardFavourite,
  );

  return (
    <div 
      ref={setNodeRef}
      className={cardWrapperStyles}
    >
      {!isCurrentFavourite && (
        <div
          className={styles.dragHandle}
          {...attributes}
          {...listeners}
          role="button"
          tabIndex={-1}
          aria-label={`Drag ${formattedName}`}
        >
          <Grip size="24" />
        </div>
      )}

      <Link 
        to={`/pokemon/${pokemon.id}`} 
        className={cardStyles}
        aria-label={`View details for ${formattedName}`}
      >
        <div className={styles.imageContainer}>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={`Artwork of ${formattedName}`} 
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{formattedName}</h3>
        </div>
      </Link>
    </div>
  );
}
