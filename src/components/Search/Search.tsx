import './Search.scss'
import { SearchProps } from './SearchTypes'
import { OutlinedInput } from '@mui/material'
import Button from '@mui/material/Button'

const Search = (props: SearchProps) => {
  const { setSearchTerm, searchTerm, search } = props

  return (
    <div className="search">
      <div>
        <OutlinedInput
          className="search__input"
          value={searchTerm}
          type="text"
          placeholder="Type the movie here..."
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Button
          className="search__button"
          disabled={!searchTerm}
          variant="outlined"
          onClick={search}
        >
          Search
        </Button>
      </div>
    </div>
  )
}

export default Search
