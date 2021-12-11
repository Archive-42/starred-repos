import { fetch } from './csrf'

const FIND_PERSON = 'session/findPerson'
const FIND_USERS = 'tasks/findUsers'

const findUsers = (users) => {
  return {
    type: FIND_USERS,
    users
  }
}

const findPerson = (person) => {
  return {
    type: FIND_PERSON,
    person
  }
}

export const searchPerson = (urlId) => async (dispatch) => {
  const res = await fetch(`/api/people/${urlId}`, {
    method: 'GET',
  })
  dispatch(findPerson(res.data.person));
  return res
}



export const searchPeople = (coords) => async (dispatch) => {
  const { lat, lng } = coords;
  const res = await fetch(`/api/people`, {
    method: 'POST',
    body: JSON.stringify({
      lat,
      lng
    }),
  })
  dispatch(findUsers(res.data.users));
  return res
}

const initialState = { people: null }

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_USERS:
      newState = Object.assign({}, state)
      newState.users = action.users;
      return newState;
    case FIND_PERSON:
      newState = Object.assign({}, state)
      newState.person = action.person;
      return newState;
    default:
      return state;
  }
}

export default usersReducer;