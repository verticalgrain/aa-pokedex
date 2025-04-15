import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" aria-label="Go to homepage of the Pokémon app">
          <img src="/images/pokemon-logo.svg" className={styles.logo} alt="Pokémon Logo" />
        </Link>
      </div>
    </header>
  );
}