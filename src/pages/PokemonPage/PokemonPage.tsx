import PokemonDetail from '../../components/PokemonDetail/PokemonDetail';
import FavouritesSidebar from '../../components/FavouritesSidebar/FavouritesSidebar';
import styles from './PokemonPage.module.scss';

export default function PokemonPage() {
  return (
    <div className={styles.background}>
      <FavouritesSidebar />
      <PokemonDetail />
    </div>
  );
}