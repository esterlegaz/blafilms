import './Search.scss'
import { SearchProps } from './SearchTypes'

const Search = (props: SearchProps) => {
  const { setSearchTerm, searchTerm, search } = props

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button
        className={!searchTerm ? 'button-disabled' : ''}
        disabled={!searchTerm}
        onClick={search}
      >
        Search
      </button>
    </div>
  )
}

export default Search
