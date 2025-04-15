import { Link } from 'react-router-dom';
import { PokemonDetail } from '../../models/types';
import { formatPokemonName } from '../../utils/utils'
import styles from './PokemonCard.module.scss';

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const formattedName = formatPokemonName(pokemon.name);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={formattedName} 
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{formattedName}</h3>
      </div>
    </Link>
  );
}