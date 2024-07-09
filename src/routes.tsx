import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';

const AppRoutes: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <Router>
            <Navbar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Home searchQuery={searchQuery} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/favorites" element={<Favorites searchQuery={searchQuery} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
