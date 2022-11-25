export interface SearchResult {
  Result?: string
  Search?: Film[]
  Error?: any
  totalResult?: string
}

export interface Film {
  imdbID?: number
  Poster: string
  Title: string
  Type: string
  Year: string
}
