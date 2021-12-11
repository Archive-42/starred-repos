import { fetch } from './csrf'

const ADD_TESTIMONY = 'testimony/addTestimony'
const UPDATE_TESTIMONY = 'testimony/updateTestimony'
const FIND_TESTIMONY = 'testimony/findTestimony'
const DELETE_TESTIMONY = 'testimony/deleteTestimony'

const findTestimony = (testimony) => {
  return {
    type: FIND_TESTIMONY,
    testimony
  }
}

const addTestimony = (testify) => {
  return {
    type: ADD_TESTIMONY,
    testify,
  }
}

const updateTestimony = (id, upComment) => {
  return {
    type: UPDATE_TESTIMONY,
    id,
    'comment': upComment
  }
}

const deleteTestimony = (primaryKey) => {
  return {
    type: DELETE_TESTIMONY,
    primaryKey
  }
}

export const testimonyUpdate = (test) => async (dispatch) => {
  const { primaryKey, comment } = test
  const res = await fetch(`/api/testimony/`, {
    method: 'PATCH',
    body: JSON.stringify({
      primaryKey,
      comment
    }),
  })
  dispatch(updateTestimony(res.data.id, res.data.upComment));
  return res
}

export const testimonyDelete = (id) => async (dispatch) => {
  const res = await fetch(`/api/testimony/${id}`, {
    method: 'DELETE',
  })
  dispatch(deleteTestimony(res.data.primaryKey));
  return res
}

export const testimonyAdd = (test) => async (dispatch) => {
  const { userId, commenterId, comment } = test;
  const res = await fetch(`/api/testimony/`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      commenterId,
      comment
    }),
  })
  dispatch(addTestimony(res.data.testimony));
  return res
}

export const testimonySearch = (id) => async (dispatch) => {
  const {userId} = id
  const res = await fetch(`/api/testimony/${userId}`, {
    method: 'GET',
  })
  dispatch(findTestimony(res.data.testimony));
  return res
}

const initialState = { testimony: null }

const testimonyReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_TESTIMONY:
      newState = Object.assign({}, state)
      newState.testimony = action.testimony;
      return newState;
    case ADD_TESTIMONY:
      newState = Object.assign({}, state)
      newState.testimony[newState.testimony.length] = action.testify;
      return newState;
    case UPDATE_TESTIMONY:
      newState = Object.assign({}, state)
      for (let i = 0; i < newState.testimony.length; i++){
        let test = newState.testimony[i]
        if (test.id === action.id) {
          test.comment = action.comment
        };
      }
      return newState;
    case DELETE_TESTIMONY:
      newState = Object.assign({}, state)
      const testimony = newState.testimony.filter(person => person.id !== parseInt(action.primaryKey));
      newState.testimony = testimony
      return newState
    default:
      return state;
  }
}

export default testimonyReducer;