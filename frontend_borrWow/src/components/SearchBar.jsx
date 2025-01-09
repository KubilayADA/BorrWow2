import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Debounce function to delay the search
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

  // Navigate to search results with the query
  const handleSearch = (query) => {
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query.toLowerCase())}`);
    } else {
      navigate(-1); // Navigate back if no search term
    }
  };

  // Debounced version of handleSearch
  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  // Handle input change and trigger debounced search
  const handleInputChange = (event) => {
    const trimmedSearchTerm = event.target.value.trim();
    setSearchTerm(trimmedSearchTerm);
    debouncedSearch(trimmedSearchTerm);
  };

  return (
    <form className={styles.searchForm}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput} // Apply styles to the input
      />
      <button type="submit" className={styles.searchButton} onClick={(e) => e.preventDefault()}>
        Search
      </button> {/* Apply styles to the button */}
    </form>
  );
};

export default SearchBar;
