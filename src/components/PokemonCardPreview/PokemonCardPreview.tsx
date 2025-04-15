import { FavouritePokemon } from '../../models/types';
import { formatPokemonName } from '../../utils/utils';
import styles from './PokemonCardPreview.module.scss';

interface PokemonCardPreviewProps {
  pokemon: FavouritePokemon;
}

export default function PokemonCardPreview({ pokemon }: PokemonCardPreviewProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={pokemon.image} 
          alt={formatPokemonName(pokemon.name)} 
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{formatPokemonName(pokemon.name)}</h3>
      </div>
    </div>
  );
}