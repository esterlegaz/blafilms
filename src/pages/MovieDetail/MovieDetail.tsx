import { useParams } from 'react-router-dom'
import ListItem from '../../components/List/ListItem'

const MovieDetail = () => {
  const { movieId } = useParams()

  return (
    <div>
      <p>Movie detail: {movieId}</p>
      {/* <ListItem /> */}
    </div>
  )
}

export default MovieDetail
