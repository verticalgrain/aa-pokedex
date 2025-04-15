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
    if (activeField === field) {
      const newDirection: SortDirection = activeDirection === 'asc' ? 'desc' : 'asc';
      setActiveDirection(newDirection);
      sortPokemon({ field, direction: newDirection });
    } else {
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

  const renderSortButton = (field: SortField, label: string) => {
    const isActive = activeField === field;
    const direction = isActive ? activeDirection : 'asc';
    const arrow = isActive ? (direction === 'asc' ? '↓' : '↑') : '';
    const ariaLabel = `Sort by ${label} ${isActive ? (direction === 'asc' ? 'ascending' : 'descending') : ''}`;

    return (
      <button
        className={clsx(styles.filterButton, { [styles.active]: isActive })}
        onClick={() => handleSort(field)}
        aria-pressed={isActive}
        aria-label={ariaLabel}
      >
        {label} {arrow}
      </button>
    );
  };

  return (
    <div className={styles.filterContainer}>
      <fieldset className={styles.filterOptions} aria-label="Sort Pokémon">
        <div className={styles.filterLabel}>Sort by:</div>
        {renderSortButton('name', 'Name')}
        {renderSortButton('hp', 'HP')}
        {renderSortButton('attack', 'Attack')}
        {renderSortButton('speed', 'Speed')}
      </fieldset>
      <button className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
