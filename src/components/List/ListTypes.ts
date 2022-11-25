import { Film } from './../Search/SearchTypes'

export interface ListInfo {
  errorMessage: string
  goToNextPage: () => void
  goToPreviousPage: () => void
  results?: Film[]
  searchTerm: string
}
