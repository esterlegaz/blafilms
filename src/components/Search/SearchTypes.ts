export interface SearchResult {
  Result?: string
  Search?: Film[]
  Error?: string
  totalResult?: string
}

export interface Film {
  imdbID?: number
  Poster: string
  Title: string
  Type: string
  Year: string
}

export interface SearchProps {
  search: () => void
  searchTerm: string
  setSearchTerm: (arg0: string) => void
}
