import { fetch } from './csrf'

const FIND_LOCALS_SEARCH_LOCATION = 'tasks/findLocalsSearchLocation'
const FIND_LOCALS_SEARCH = 'tasks/findLocalsSearch'

const findLocalsSearch = (locals) => {
  return {
    type: FIND_LOCALS_SEARCH,
    locals
  }
}

const findLocalsSearchLocation = (locals) => {
  return {
    type: FIND_LOCALS_SEARCH_LOCATION,
    locals,
  }
}


export const localsFind = (keyword) => async (dispatch) => {
  const { keywordSearch } = keyword;
  const res = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({
      keywordSearch
    }),
  })
  dispatch(findLocalsSearch(res.data.locals));
  return res;
}

export const localsFindLocation = (keyword) => async (dispatch) => {
  const { keywordSearch, locationSearch } = keyword;
  const res = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({
      keywordSearch,
      locationSearch
    }),
  })
  dispatch(findLocalsSearch(res.data.locals));
  return res;
}

const initialState = { locals: null }

const localsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_LOCALS_SEARCH:
      newState = Object.assign({}, state)
      newState.locals = action.locals;
      return newState;
    case FIND_LOCALS_SEARCH_LOCATION:
      newState = Object.assign({}, state)
      newState.locals = action.locals;
      return newState;
    default:
      return state;
  }
}

export default localsReducer;