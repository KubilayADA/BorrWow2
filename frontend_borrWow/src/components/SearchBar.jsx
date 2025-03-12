import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  
  
  

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = (query) => {
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query.toLowerCase())}`);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleInputChange = (event) => {
    const trimmedSearchTerm = event.target.value.trim();
    setSearchTerm(trimmedSearchTerm);
    debouncedSearch(trimmedSearchTerm);
  };

  const toggleSearch = () => {
    if (isMobile) {
      setIsMobileSearchActive(!isMobileSearchActive);
      if (!isMobileSearchActive) setSearchTerm('');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${styles.searchContainer} ${isMobileSearchActive ? styles.active : ''}`}>
      <form className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className={`${styles.searchInput} ${isMobileSearchActive ? styles.active : ''}`}
        />
        <button 
          type="button" 
          className={`${styles.searchButton} ${isMobile ? styles.mobileIcon : ''}`}
          onClick={toggleSearch}
          aria-label="Search"
        >
          {isMobileSearchActive ? (
            <span className={styles.closeIcon}>×</span>
          ) : (
            <span className={styles.searchIcon}>🔍</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;