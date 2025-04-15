import PokemonList from '../../components/PokemonList/PokemonList';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className="sr-only">Pokémon Collection</h1>
        <SearchBar />
        <PokemonList />
      </div>
    </div>
  );
}