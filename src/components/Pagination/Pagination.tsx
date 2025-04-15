import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { usePokemonContext } from '../../context/PokemonContext';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const {
    currentPage,
    fetchPokemon, 
    totalPages
  } = usePokemonContext();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchPokemon(page);
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  };

  // I've added some comments below to explain my logic for calculating the page numbers in the pagination:
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // If there are 5 or fewer total pages, show all 5
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show 5 page numbers
    let start = Math.max(1, currentPage - 2);
    let end = start + 4;
    
    // If near the end of the API results, adjust to make sure there are always 5 pages numbers
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - 4);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageButtonLeftStyles = clsx(
    styles.pageButton,
    currentPage === 1 && styles.pageButtonDisabled,
  )

  const pageButtonRightStyles = clsx(
    styles.pageButton,
    currentPage === totalPages && styles.pageButtonDisabled,
  )

  return (
    <div className={styles.pagination}>
      <button 
        className={pageButtonLeftStyles}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft color="#424952" size="18" />
        <span className="sr-only">Previous</span>
      </button>
      
      <div className={styles.pageNumbers}>
        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            className={`${styles.pageNumber} ${currentPage === pageNum ? styles.activePage : ''}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      
      <button
        className={pageButtonRightStyles}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRight color="#424952" size="18" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  )
}

export default Pagination;