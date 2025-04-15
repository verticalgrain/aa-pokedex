import styles from './PokemonCardSkeleton.module.scss';

const PokemonCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
    </div>
  )
}

export default PokemonCardSkeleton;