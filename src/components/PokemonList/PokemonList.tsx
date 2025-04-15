import { usePokemonContext } from '../../context/PokemonContext';
import Pagination from '../Pagination/Pagination';
import DraggablePokemonCard from '../DraggablePokemonCard/DraggablePokemonCard';
import PokemonCardSkeleton from '../PokemonCardSkeleton/PokemonCardSkeleton';
import FilterOptions from '../FilterOptions/FilterOptions';
import styles from './PokemonList.module.scss';

export default function PokemonList() {
  const { 
    pokemonList, 
    isLoading, 
    error,  
    totalPages, 
    searchQuery
  } = usePokemonContext();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {Array.from({ length: 16 }).map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {searchQuery && (
        <>
          <FilterOptions />
          <div className={styles.searchResults}>
            Showing results for: <span className={styles.searchTerm}>{searchQuery}</span>
            {pokemonList.length === 0 && <span> (No matches found)</span>}
          </div>
        </>
      )}

      {pokemonList.length > 0 ? (
        <>
          <div className={styles.grid}>
            {pokemonList.map(pokemon => (
              <DraggablePokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {!searchQuery && totalPages > 1 && (
            <Pagination />
          )}
        </>
      ) : (
        <div className={styles.noResults}>No Pokémon found</div>
      )}
    </div>
  );
}