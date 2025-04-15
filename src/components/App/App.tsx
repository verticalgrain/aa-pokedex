import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from '../../context/PokemonContext';
import { FavouritesProvider } from '../../context/FavouritesContext';
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import PokemonPage from '../../pages/PokemonPage/PokemonPage';
import styles from './App.module.scss';

export default function App() {
  return (
    <div className={styles.app}>
      <PokemonProvider>
        <FavouritesProvider>
          <Router>
            <Header />
            <main className={styles.mainContent}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:pokemonId" element={<PokemonPage />} />
              </Routes>
            </main>
          </Router>
        </FavouritesProvider>
      </PokemonProvider>
    </div>
  );
}