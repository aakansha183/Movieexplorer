// components/SearchBar.tsx
import React, { useState } from 'react';
import { TextField, Container } from '@mui/material';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <TextField
                id="search"
                label="Search Movie"
                variant="outlined"
                fullWidth
                value={query}
                onChange={handleSearchChange}
            />
        </Container>
    );
};

export default SearchBar;
