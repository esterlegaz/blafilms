import { useState, useEffect, useRef } from 'react'
import './App.scss'
import List from './components/List/List'
import Search from './components/Search/Search'
import SortBy from './components/Sort/SortBy'
import { searchMovies } from './services/api.service'
import { SearchResult, Film } from './components/Search/SearchTypes'

const App = () => {
  const didMount = useRef(false)
  const [searchResult, setSearchResult] = useState<{
    Result?: string
    Search?: Film[]
    Error?: string
    totalResults?: string
  }>({})
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (didMount.current) {
      search()
    } else {
      didMount.current = true
    }
  }, [currentPage])

  const search = async () => {
    const data: SearchResult = await searchMovies(searchTerm, currentPage)
    if (!data.Error) {
      const existingIds: number[] = []
      const filteredResult: Film[] = []

      data?.Search?.forEach((searchResult: any) => {
        if (existingIds.indexOf(searchResult.imdbID) === -1) {
          existingIds.push(searchResult.imdbID)
          filteredResult.push(searchResult)
        }
      })
      const finalResult = { ...data, Search: filteredResult }

      setSearchResult(finalResult)
      setErrorMessage('')
    } else {
      setSearchResult({})
      setErrorMessage(data.Error)
    }
  }

  const sortBy = (sortValue: string) => {
    const bla: any = searchResult
    console.log('soirt', sortValue)
    const sortedResult = bla.Search.sort((a: any, b: any) => {
      if (a[sortValue] > b[sortValue]) {
        return 1
      }
      if (a[sortValue] < b[sortValue]) {
        return -1
      }
      return 0
    })
    setSearchResult({ ...searchResult, Search: sortedResult })
  }

  const goToNextPage = () => {
    const maxPages = Math.ceil((searchResult.totalResults as any) / 10)
    if (currentPage < maxPages) setCurrentPage(currentPage + 1)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="App">
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        search={search}
      />
      {searchResult.Search && <SortBy sortBy={sortBy} />}
      <List
        results={searchResult?.Search}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        searchTerm={searchTerm}
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default App
