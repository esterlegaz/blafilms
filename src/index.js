import './index.css'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: {
    movies: rootReducer,
  },
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
