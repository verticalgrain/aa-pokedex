import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from '../../context/PokemonContext';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const { searchPokemonByName, searchQuery } = usePokemonContext();
  const [inputValue, setInputValue] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchPokemonByName(inputValue);
    navigate('/');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="sr-only">
        Search Pokemon
      </button>
      <Search className={styles.icon} color="#a3abb2" size="18" />
    </form>
  );
}