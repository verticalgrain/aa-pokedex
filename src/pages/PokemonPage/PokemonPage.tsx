import PokemonDetail from '../../components/PokemonDetail/PokemonDetail';
import styles from './PokemonPage.module.scss';

export default function PokemonPage() {
  return (
    <div className={styles.background}>
      <PokemonDetail />
    </div>
  );
}