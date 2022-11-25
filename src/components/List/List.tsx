import { Link } from 'react-router-dom'
import './List.scss'
import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg'
import { ListInfo } from './ListTypes'
import ListItem from './ListItem'

const List = (props: ListInfo) => {
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
            {results.map((result: any) => (
              <Link
                style={{ textDecoration: 'none' }}
                to={`movie/${result.imdbID}`}
              >
                <ListItem movie={result} />
              </Link>
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
