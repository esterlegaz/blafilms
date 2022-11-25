import placeholderImg from './../../assets/placeholder.png'
import './List.scss'

const ListItem = (props: any) => {
  const movie = props.movie
  return (
    <div key={movie.imdbID} className="search-item">
      <img
        src={movie.Poster === 'N/A' ? placeholderImg : movie.Poster}
        alt="poster"
      />
      <div className="search-item-data">
        <div className="title">{movie.Title}</div>
        <div className="meta">{`${movie.Type} | ${movie.Year}`}</div>
      </div>
    </div>
  )
}

export default ListItem
