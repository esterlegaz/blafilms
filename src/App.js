import React, { useState, useEffect } from 'react';
import './App.scss';
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
      <List
        results={searchResult?.Search}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        searchTerm={searchTerm}
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default App;
