import { fetch } from './csrf'

const ADD_TASK = 'tasks/addTask'
const UPDATE_TASK = 'tasks/updateTask'
const FIND_TASKS = 'tasks/findTasks'

const findTasks = (tasks) => {
  return {
    type: FIND_TASKS,
    tasks
  }
}

const addTask = (task) => {
  return {
    type: ADD_TASK,
    task,
  }
}

const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    task,
  }
}

export const taskUpdate = (task) => async (dispatch) => {
  const { taskId, urlId, name, userId } = task
  const res = await fetch(`/api/users/${urlId}/tasks`, {
    method: 'PATCH',
    body: JSON.stringify({
      taskId,
      urlId,
      userId,
      name
    }),
  })
  dispatch(updateTask(res.data.task));
  return res
}

export const taskAdd = (task) => async (dispatch) => {
  const { choreType, taskDetails, id } = task;
  const res = await fetch(`/api/users/${id}/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      choreType,
      taskDetails
    }),
  })
  dispatch(addTask(res.data.task));
  return res
}

export const search = (user) => async (dispatch) => {
  const { urlId } = user;
  const res = await fetch(`/api/users/${urlId}/tasks`, {
    method: 'GET',
  })
  dispatch(findTasks(res.data.tasks));
  return res
}

const initialState = { tasks: null }

const tasksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_TASKS:
      newState = Object.assign({}, state)
      newState.tasks = action.tasks;
      return newState;
    case ADD_TASK:
      newState = Object.assign({}, state)
      newState.tasks[newState.tasks.length] = action.task
      return newState;
    case UPDATE_TASK:
      newState = Object.assign({}, state)
      for (let i = 0; i < newState.tasks.length; i++){
        let task = newState.tasks[i]
        if (task.id === action.task.id) {
          task = action.task
        };
      }
      return newState;
    default:
      return state;
  }
}

export default tasksReducer;