import React, { useState, useEffect } from 'react'
import './App.css';
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import List from './components/List/List'
import Search from './components/Search/Search';

function App() {
  const [searchResult, setSearchResult] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('');
    } else {
      setErrorMessage(data.Error);
    }
  }

  const goToNextPage = () => {
    const maxPages = Math.ceil(searchResult.totalResults / 10);
    if (currentPage < maxPages) setCurrentPage(currentPage + 1);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  return (
    <div className="App">
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        search={search}
      />
      {!searchResult ?
        (
          <p>No results yet</p>
        ) : (
          <div className="search-results">
            <div
              className="chevron"
              onClick={goToPreviousPage}
            >
              <ChevronLeft />
            </div>
            <List results={searchResult?.Search} />
            <div
              className="chevron"
              onClick={goToNextPage}
            >
              <ChevronRight />
            </div>
          </div>
        )}
      {searchTerm && errorMessage &&
        <p>{errorMessage}</p>
      }
    </div>
  )
}

export default App
