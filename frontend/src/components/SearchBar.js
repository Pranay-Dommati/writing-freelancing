import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/landing-page.css';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const suggestionRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchValue.trim().length > 0) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/search/?q=${searchValue}`);
                    setSuggestions(response.data);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSuggestionClick = (collegeName) => {
        setSearchValue(collegeName);
        setSuggestions([]);
        setShowSuggestions(false);
        navigate('/college');  // Navigate to college page
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="search-bar-container" ref={suggestionRef}>
            <input
                type="text"
                className="search-bar"
                placeholder="Enter College/School"
                value={searchValue}
                onChange={handleInputChange}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((college) => (
                        <li
                            key={college.id}
                            onClick={() => handleSuggestionClick(college.name)}
                        >
                            {college.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;