import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getPokemonDetail } from '../../api/pokemonApi';
import { PokemonDetail as PokemonDetailType } from '../../models/types';
import PokemonDetailStats from '../PokemonDetailStats/PokemonDetailStats';
import { formatPokemonName } from '../../utils/utils'
import styles from './PokemonDetail.module.scss';

export default function PokemonDetail() {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPokemonDetail(pokemonId || '');
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (isLoading) {
    return <div className={styles.loading}>Loading Pokémon data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!pokemon) {
    return <div className={styles.error}>Pokémon not found</div>;
  }

  const formattedName = formatPokemonName(pokemon.name);

  return (
    <div className={styles.container}>
      <div className={styles.breadCrumbs}>
        <Link to="/" className={styles.breadCrumbLink}>
          Pokémon
        </Link>
        <ChevronRight size="18" color="#a3aab1" />
        <div className={styles.breadCrumbItem}>
          {formattedName}
        </div>
      </div>
              
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={formattedName} 
            className={styles.image}
          />
        </div>
        
        <div className={styles.info}>
          <div className={styles.id}>
            # {pokemon.id}
          </div>
          <div className={styles.name}>
            {formattedName}
          </div>

          <div className={styles.types}>
            {pokemon.types.map((typeInfo) => (
              <span 
                key={typeInfo.type.name} 
                className={`${styles.type} ${styles[typeInfo.type.name]}`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          <div className={styles.basicInfo}>
            <div className={styles.basicInfoItem}>
              <span className={styles.basicInfoLabel}>Height:</span>
              <span className={styles.basicInfoValue}>{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className={styles.basicInfoItem}>
              <span className={styles.basicInfoLabel}>Weight:</span>
              <span className={styles.basicInfoValue}>{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className={styles.basicInfoItem}>
              <span className={styles.basicInfoLabel}>Base Experience:</span>
              <span className={styles.basicInfoValue}>{pokemon.base_experience}</span>
            </div>
          </div>

          <PokemonDetailStats pokemon={pokemon} />

          <div className={styles.abilities}>
            <h3 className={styles.abilitiesLabel}>Abilities:</h3>
            <ul className={styles.abilityList}>
              {pokemon.abilities.map((abilityInfo, index) => (
                <li key={index} className={styles.ability}>
                  {abilityInfo.ability.name}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}



