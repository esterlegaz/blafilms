import { useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import ListItem from '../../components/List/ListItem'
import { Film } from '../../components/Search/SearchTypes'
import Button from '@mui/material/Button'
import './MovieDetail.scss'

const MovieDetail = () => {
  const { store } = useContext(ReactReduxContext)

  const movies: Film[] | undefined = store.getState().movies.Search
  const { movieId } = useParams()
  const movie = movies?.find(movie => movie.imdbID === movieId)

  return (
    <div>
      <ListItem movie={movie} />
      <div className="movie-detail__container">
        <Link style={{ textDecoration: 'none' }} to="/">
          <Button variant="outlined">Go back</Button>
        </Link>
      </div>
    </div>
  )
}

export default MovieDetail
