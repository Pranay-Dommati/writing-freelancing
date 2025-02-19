import React, { useState } from 'react';
import '../styles/landing-page.css';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-bar"
                placeholder="Enter College/School"
                value={searchValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;