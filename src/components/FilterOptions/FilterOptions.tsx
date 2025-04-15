import { useState } from 'react';
import clsx from 'clsx';
import { usePokemonContext } from '../../context/PokemonContext';
import { SortField, SortDirection } from '../../models/types';
import styles from './FilterOptions.module.scss';

export default function FilterOptions() {
  const { sortPokemon, sortOption, resetFilters } = usePokemonContext();
  const [activeField, setActiveField] = useState<SortField | null>(sortOption?.field || null);
  const [activeDirection, setActiveDirection] = useState<SortDirection>(sortOption?.direction || 'asc');

  const handleSort = (field: SortField) => {
    // If clicking the same field, toggle direction
    if (activeField === field) {
      const newDirection: SortDirection = activeDirection === 'asc' ? 'desc' : 'asc';
      setActiveDirection(newDirection);
      sortPokemon({ field, direction: newDirection });
    } else {
      // If clicking a new field, set it with ascending direction
      setActiveField(field);
      setActiveDirection('asc');
      sortPokemon({ field, direction: 'asc' });
    }
  };

  const handleReset = () => {
    setActiveField(null);
    setActiveDirection('asc');
    resetFilters();
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterOptions}>
        <span className={styles.filterLabel}>Sort by:</span>
        <button 
          className={clsx(styles.filterButton, { [styles.active]: activeField === 'name' })}
          onClick={() => handleSort('name')}
        >
          Name {activeField === 'name' && (activeDirection === 'asc' ? '↓' : '↑')}
        </button>
        <button 
          className={clsx(styles.filterButton, { [styles.active]: activeField === 'hp' })}
          onClick={() => handleSort('hp')}
        >
          HP {activeField === 'hp' && (activeDirection === 'asc' ? '↓' : '↑')}
        </button>
        <button 
          className={clsx(styles.filterButton, { [styles.active]: activeField === 'attack' })}
          onClick={() => handleSort('attack')}
        >
          Attack {activeField === 'attack' && (activeDirection === 'asc' ? '↓' : '↑')}
        </button>
        <button 
          className={clsx(styles.filterButton, { [styles.active]: activeField === 'speed' })}
          onClick={() => handleSort('speed')}
        >
          Speed {activeField === 'speed' && (activeDirection === 'asc' ? '↓' : '↑')}
        </button>
      </div>
      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}