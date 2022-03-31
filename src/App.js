import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {
  const [searchResult, setSearchResult] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    search();
  }, [currentPage]);

  const search = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=a461e386&s=${searchTerm}&page=${currentPage}`)
    const data = await response.json();
    if (!data.Error) {
      const existingIds = [];
      const filteredResult = [];

      data.Search.map(searchResult => {
        if (existingIds.indexOf(searchResult.imdbID) === -1) {
          existingIds.push(searchResult.imdbID);
          filteredResult.push(searchResult);
        }
      })

      data.Search = filteredResult;

      setSearchResult(data);
    }
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          onClick={search}
        >Search
        </button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div
            className="chevron"
            onClick={goToPreviousPage}
          >
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
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
          <div
            className="chevron"
            onClick={goToNextPage}
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
