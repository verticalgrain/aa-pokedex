import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <Link to="/" aria-label="Homepage" title="Go to the Pokémon app homepage">
          <img src="/images/pokemon-logo.svg" className={styles.logo} alt="Pokémon app Logo" />
        </Link>
      </div>
    </header>
  );
}