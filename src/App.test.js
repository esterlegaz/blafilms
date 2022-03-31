import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('displays "no results" message while having no movies', () => {
    render(<App />)
    expect(screen.getByText('No results yet')).toBeInTheDocument()
  })
})

// I haven't developed many test in my previous job, but tried to implement some easy ones
test('It should change input value when typing on it', () => {
  render(<App />)
  const input = screen.getByPlaceholderText('Search...')
  fireEvent.change(input, { target: { value: 'king' } })
  expect(input.value).toBe('king')
})

test('It should able button when search term is provided', () => {
  render(<App />)
  const input = screen.getByPlaceholderText('Search...')
  fireEvent.change(input, { target: { value: 'king' } })
  expect(screen.getByRole('button')).not.toBeDisabled()
})

test('It should disable button when no search term is introduced', () => {
  render(<App />)
  const input = screen.getByPlaceholderText('Search...')
  fireEvent.change(input, { target: { value: '' } })
  expect(screen.getByRole('button')).toBeDisabled()
})

