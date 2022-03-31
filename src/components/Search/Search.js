import React from 'react';
import './Search.scss';

const Search = (props) => {
    const { setSearchTerm, searchTerm, search } = props;

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
            <button
                className={!searchTerm && 'button-disabled'}
                disabled={!searchTerm}
                onClick={search}
            >Search
            </button>
        </div>
    )
}

export default Search;