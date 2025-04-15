import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from '../../context/PokemonContext';
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import PokemonPage from '../../pages/PokemonPage/PokemonPage';
import styles from './App.module.scss';

export default function App() {
  return (
    <div className={styles.app}>
      <PokemonProvider>
        <Router>
          <Header />
          <main className={styles.mainContent}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pokemon/:pokemonId" element={<PokemonPage />} />
            </Routes>
          </main>
        </Router>
      </PokemonProvider>
    </div>
  );
}