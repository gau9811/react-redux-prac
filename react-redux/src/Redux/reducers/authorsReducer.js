import * as types from "../action/actionTypes"
import initialState from "./initialState"
export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_ACCESS:
      return action.authors
    default:
      return state
  }
}
