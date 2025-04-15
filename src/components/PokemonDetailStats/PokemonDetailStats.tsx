import { PokemonDetail } from '../../models/types';
import { getStatBarWidth } from '../../utils/utils'
import styles from './PokemonDetailStats.module.scss';

interface PokemonDetailStatsProps {
  pokemon: PokemonDetail;
}

export default function PokemonDetailStats({pokemon}: PokemonDetailStatsProps) {
  const getStatValue = (statName: string): number => {
    return pokemon.stats.find(stat => stat.stat.name === statName)?.base_stat || 0;
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>HP:</span>
          <div className={styles.statBarContainer}>
            <div 
              className={styles.statBar} 
              style={{ width: getStatBarWidth(getStatValue('hp')) }}
            />
          </div>
          <span className={styles.statValue}>{getStatValue('hp')}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Attack:</span>
          <div className={styles.statBarContainer}>
            <div 
              className={styles.statBar} 
              style={{ width: getStatBarWidth(getStatValue('attack')) }}
            />
          </div>
          <span className={styles.statValue}>{getStatValue('attack')}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Defense:</span>
          <div className={styles.statBarContainer}>
            <div 
              className={styles.statBar} 
              style={{ width: getStatBarWidth(getStatValue('defense')) }}
            />
          </div>
          <span className={styles.statValue}>{getStatValue('defense')}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Sp. Attack:</span>
          <div className={styles.statBarContainer}>
            <div 
              className={styles.statBar} 
              style={{ width: getStatBarWidth(getStatValue('special-attack')) }}
            />
          </div>
          <span className={styles.statValue}>{getStatValue('special-attack')}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Sp. Defense:</span>
          <div className={styles.statBarContainer}>
            <div 
              className={styles.statBar} 
              style={{ width: getStatBarWidth(getStatValue('special-defense')) }}
            />
          </div>
          <span className={styles.statValue}>{getStatValue('special-defense')}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Speed:</span>
          <div className={styles.statBarContainer}>
            <div 
              className={styles.statBar} 
              style={{ width: getStatBarWidth(getStatValue('speed')) }}
            />
          </div>
          <span className={styles.statValue}>{getStatValue('speed')}</span>
        </div>
      </div>
    </div>
  )
}