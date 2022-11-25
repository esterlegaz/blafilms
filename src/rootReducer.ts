import { SearchResult } from './components/Search/SearchTypes'

const INITIAL_STATE: SearchResult = {
  Result: '',
  Search: [],
  Error: '',
  totalResult: '',
}

export default function rootReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return action.payload

    default:
      return state
  }
}
