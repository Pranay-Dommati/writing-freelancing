import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/landing-page.css';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCollegeForm, setShowCollegeForm] = useState(false);
    const [collegeName, setCollegeName] = useState('');
    const [cityName, setCityName] = useState('');
    const suggestionRef = useRef(null);
    const navigate = useNavigate();

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

    const handleCollegeFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/send-college-request/', {
                collegeName,
                cityName
            });
            alert('Your request has been submitted successfully!');
            setCollegeName('');
            setCityName('');
            setShowCollegeForm(false);
        } catch (error) {
            console.error('Error submitting college request:', error);
            alert('There was an error submitting your request. Please try again.');
        }
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

            {showSuggestions && suggestions.length === 0 && (
                <div className="no-suggestions">
                    <p>Can't find your college?</p>
                    <button onClick={() => setShowCollegeForm(true)}>Submit College Request</button>
                </div>
            )}

            {showCollegeForm && (
                <form className="college-form" onSubmit={handleCollegeFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="collegeName">College Name</label>
                        <input
                            type="text"
                            id="collegeName"
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cityName">City Name</label>
                        <input
                            type="text"
                            id="cityName"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};

export default SearchBar;