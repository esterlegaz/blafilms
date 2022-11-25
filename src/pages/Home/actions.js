import * as actionTypes from './action-types'

export const saveFetchData = data => ({
  type: actionTypes.FETCH_MOVIES,
  payload: data,
})
