import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/landing-page.css';
import config from '../config'; // Import the config

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCollegeForm, setShowCollegeForm] = useState(false);
    const [collegeName, setCollegeName] = useState('');
    const [cityName, setCityName] = useState('');
    const [touched, setTouched] = useState({
        collegeName: false,
        cityName: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [dialogState, setDialogState] = useState({
        show: false,
        status: '',
        message: ''
    });
    const suggestionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchValue.trim().length > 0) {
                try {
                    // Use config.API_URL instead of hardcoded URL
                    const response = await axios.get(`${config.API_URL}/search/?q=${searchValue}`);
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

    const validateField = (name, value) => {
        if (!value.trim()) {
            return name === 'collegeName' ? 'College name is required' : 'City name is required';
        }
        return '';
    };

    const handleCollegeFormChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'collegeName') {
            setCollegeName(value);
        } else if (name === 'cityName') {
            setCityName(value);
        }

        // If field has been touched, validate on change
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        
        // Mark field as touched
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validate on blur
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateForm = () => {
        const collegeNameError = validateField('collegeName', collegeName);
        const cityNameError = validateField('cityName', cityName);
        
        setErrors({
            collegeName: collegeNameError,
            cityName: cityNameError
        });
        
        setTouched({
            collegeName: true,
            cityName: true
        });

        return !collegeNameError && !cityNameError;
    };

    const handleCollegeFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Use config.API_URL instead of hardcoded URL
            await axios.post(`${config.API_URL}/send-college-request/`, {
                collegeName,
                cityName
            });
            setLoading(false);
            setDialogState({
                show: true,
                status: 'success',
                message: 'Request Submitted Successfully!'
            });
        } catch (error) {
            console.error('Error submitting college request:', error);
            setLoading(false);
            setDialogState({
                show: true,
                status: 'error',
                message: 'Error submitting request. Please try again.'
            });
        }
    };

    const handleCloseDialog = () => {
        setDialogState({ show: false, status: '', message: '' });
        setShowCollegeForm(false);
        setCollegeName('');
        setCityName('');
        setErrors({});
        setTouched({
            collegeName: false,
            cityName: false
        });
        setSearchValue('');
        setSuggestions([]);
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
            {!showCollegeForm && (
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
            )}

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

            {showSuggestions && suggestions.length === 0 && !showCollegeForm && (
                <div className="no-suggestions">
                    <p>Can't find your college?</p>
                    <button onClick={() => setShowCollegeForm(true)}>Submit College Request</button>
                </div>
            )}

            {showCollegeForm && (
                <form className="college-form" onSubmit={handleCollegeFormSubmit} noValidate>
                    <div className={`form-group ${touched.collegeName && errors.collegeName ? 'has-error' : ''}`}>
                        <label htmlFor="collegeName">College Name</label>
                        <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            value={collegeName}
                            onChange={handleCollegeFormChange}
                            onBlur={handleBlur}
                            className={touched.collegeName && errors.collegeName ? 'invalid' : ''}
                            required
                            aria-invalid={touched.collegeName && errors.collegeName ? 'true' : 'false'}
                            aria-describedby={errors.collegeName ? 'collegeName-error' : undefined}
                        />
                        {touched.collegeName && errors.collegeName && (
                            <div className="error-message" id="collegeName-error">
                                {errors.collegeName}
                            </div>
                        )}
                    </div>
                    <div className={`form-group ${touched.cityName && errors.cityName ? 'has-error' : ''}`}>
                        <label htmlFor="cityName">City Name</label>
                        <input
                            type="text"
                            id="cityName"
                            name="cityName"
                            value={cityName}
                            onChange={handleCollegeFormChange}
                            onBlur={handleBlur}
                            className={touched.cityName && errors.cityName ? 'invalid' : ''}
                            required
                            aria-invalid={touched.cityName && errors.cityName ? 'true' : 'false'}
                            aria-describedby={errors.cityName ? 'cityName-error' : undefined}
                        />
                        {touched.cityName && errors.cityName && (
                            <div className="error-message" id="cityName-error">
                                {errors.cityName}
                            </div>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        Submit
                    </button>
                </form>
            )}

            {loading && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <div className="spinner"></div>
                        <p>Submitting your request...</p>
                    </div>
                </div>
            )}

            {dialogState.show && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        {dialogState.status === 'success' ? (
                            <>
                                <h2>Request Submitted Successfully!</h2>
                                <p>Thank you for your submission. We'll review and add this college soon.</p>
                                <button onClick={handleCloseDialog} className="dialog-button">OK</button>
                            </>
                        ) : (
                            <>
                                <h2>Error</h2>
                                <p>{dialogState.message}</p>
                                <button onClick={handleCloseDialog} className="dialog-button">Try Again</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;