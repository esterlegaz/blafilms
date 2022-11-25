import React from 'react'
import placeholderImg from '../../assets/placeholder.png'
import './List.scss'
import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg'

const List = props => {
  const { results, goToNextPage, goToPreviousPage, searchTerm, errorMessage } =
    props
  return (
    <>
      {!results && !errorMessage && (
        <p className="search-results-empty">No results yet</p>
      )}
      {results && (
        <div className="search-results">
          <div className="chevron" onClick={goToPreviousPage}>
            <ChevronLeft />
          </div>
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
          <div className="chevron" onClick={goToNextPage}>
            <ChevronRight />
          </div>
        </div>
      )}

      {searchTerm && errorMessage && (
        <p className="search-error">{errorMessage} Please, try again.</p>
      )}
    </>
  )
}

export default List
