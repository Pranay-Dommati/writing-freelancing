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

    const handleSuggestionClick = (college) => {
        setSearchValue(college.name);
        setSuggestions([]);
        setShowSuggestions(false);
        navigate(`/college/${college.id}`);
    };

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
            <div className="search-input-wrapper">
                <svg 
                    className="search-icon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                <span className="search-separator">|</span>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Enter College/School"
                    value={searchValue}
                    onChange={handleInputChange}
                />
            </div>

{showSuggestions && suggestions.length > 0 && (
    <ul className="suggestions-list">
        {suggestions.map((college) => (
            <li key={college.id} onClick={() => handleSuggestionClick(college)}>
                <span className="college-emoji">🏫</span>
                <span 
                    className="college-name-text"
                    ref={(el) => {
                        if (el) {
                            const shouldScroll = el.scrollWidth > el.clientWidth;
                            el.setAttribute('data-scroll', shouldScroll);
                        }
                    }}
                >
                    {college.name}
                </span>
            </li>
        ))}
    </ul>
)}
        </div>
    );
};


export default SearchBar;