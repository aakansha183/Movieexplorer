import React, { useState, useEffect } from 'react';
import { TextField, Container } from '@mui/material';
import './SearchBar.css';
import debounce from 'lodash.debounce';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const debouncedOnSearch = debounce((searchQuery: string) => {
        onSearch(searchQuery);
    }, 1000);

    useEffect(() => {
        debouncedOnSearch(query);

      
        return () => {
            debouncedOnSearch.cancel();
        };
    }, [query, debouncedOnSearch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <Container maxWidth="sm" className="search-container">
            <TextField
                id="search"
                label="Search Movie"
                variant="outlined"
                fullWidth
                value={query}
                onChange={handleSearchChange}
                className="search-input"
            />
        </Container>
    );
};

export default SearchBar;

