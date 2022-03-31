import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {
  const [searchResult, setSearchResult] = useState();
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const search = async () => {
      const response = await fetch(`http://www.omdbapi.com/?apikey=a461e386&s=${searchTerm}`)
      const data = await response.json();

      if (!searchResult) {
        setSearchResult(data);
      }
    }

    search()
  })

  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
        <button>Search</button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
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
          <div className="chevron">
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
