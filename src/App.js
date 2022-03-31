import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import List from './components/List/List'
import Search from './components/Search/Search';
import { searchMovies } from './services/api.service';

function App() {
  const didMount = useRef(false);
  const [searchResult, setSearchResult] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (didMount.current) {
      search();
    } else {
      didMount.current = true;
    }
  }, [currentPage]);

  const search = async () => {
    const data = await searchMovies(searchTerm, currentPage);
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
      setSearchResult();
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
