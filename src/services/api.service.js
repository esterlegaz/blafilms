export const searchMovies = async (term, page) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=a461e386&s=${term}&page=${page}`)
    const data = await response.json();
    return data;
}