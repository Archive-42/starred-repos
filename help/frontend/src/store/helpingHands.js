import { fetch } from './csrf'

const ADD_HELPING_HAND = 'helpingHands/addHelpingHand'
const COUNT_HELPING_HANDS = 'helpingHands/countHelpingHands'

const addHelpingHand = () => {
  return {
    type: ADD_HELPING_HAND,
  }
}

const countHelpingHands = (allHands) => {
  return {
    type: COUNT_HELPING_HANDS,
    allHands
  }
}

export const handAdd = (helpingHand) => async (dispatch) => {
  const { urlIdAdd, id } = helpingHand;
  const likerId = urlIdAdd
  const res = await fetch(`/api/helpingHands`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      likerId
    }),
  })
  return res
}

export const searchHands = (id) => async (dispatch) => {
  const res = await fetch(`/api/helpingHands/${id}`, {
    method: 'GET',
  })
  dispatch(countHelpingHands(res.data.allHands));
  return res
}

const initialState = { helpingHands: null }

const helpingHandsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_HELPING_HAND:
      newState = Object.assign({}, state)
      return newState;
    case COUNT_HELPING_HANDS:
      newState = Object.assign({}, state)
      newState.allHands = action.allHands
      return newState;
    default:
      return state;
  }
}

export default helpingHandsReducer;