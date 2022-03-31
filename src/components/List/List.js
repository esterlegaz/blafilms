import React from 'react';
import placeholderImg from './../../placeholder.png';
import './List.css'

const List = (props) => {
    const { results } = props;
    return (
        <div className="search-results-list">
            {results.map(result => (
                <div key={result.imdbID} className="search-item">
                    <img
                        src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                        alt="poster"
                    />
                    <div className="search-item-data">
                        <div className="title">{result.Title}</div>
                        <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;