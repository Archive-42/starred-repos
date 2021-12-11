import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink, Switch, Route} from 'react-router-dom'

import './Tasks.css';
import * as TaskActions from '../../store/tasks'


const Tasks = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.users.person)
  const currentTasks = useSelector(state => state.tasks.tasks)
  const [isLoaded, setIsLoaded] = useState(false);
  const [taskDetails, setTaskDetails] = useState('')
  const [currentHelpType, setCurrentHelpType] = useState()
  const [taskChange, setTaskChange] = useState('')
  const [taskId, setTaskId] = useState()
  const [choreType, setChoreType] = useState('House Chores')
  const { id } = user;

  //USE TO GET CORRECT USERPAGE/INFORMATION
  let urlId = parseInt(window.location.pathname.split('/')[2])


  const tabHide = (e) => {
    const ele = document.querySelector('.show');
    ele.classList.remove('show')
    e.target.parentElement.classList.add('show')
    setTaskChange(e.target)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(TaskActions.taskAdd({ choreType, taskDetails, id }))
      .then(setTaskDetails(''))
    return
  };

  const alterTask = (e) => {
    let taskId = e.target.id
    let userId = currentUser.id;
    let name;
    if (e.target.name) {
      name = e.target.name
    } else {
      name = null
    }
    dispatch(TaskActions.taskUpdate({ taskId, urlId, name, userId }))
      .then(setTaskId(taskId))
      .then(() => {
        if (document.querySelector('.task-list__checkbox')) {
          document.querySelector('.task-list__checkbox').checked = false;
        }
      })
    return;
  };

  useEffect(() => {
    dispatch(TaskActions.search({
      urlId
    })).then((res) => setCurrentHelpType(res.data.helpType)).then(() => setIsLoaded(true))
  }, [dispatch, setTaskDetails, taskDetails, setTaskId, taskId]);

  let complete;
  let incomplete;
  if (isLoaded) {
    complete = Object.values(currentTasks).map((task, idx) => {
        if ((task.completed && user.helpType) || (currentUser.id === user.id && currentUser.helpType)){
          return(
            <div className='task-container__list__completed' key={idx}>
              <i className="far fa-check-square completed-icon"></i>
              <p>{task.category} - {task.details}</p>
              <a className='task-container__list__completed__link'href={`/users/${task.helpeeId}`}>helpee</a>
            </div>
          )
        } else if (task.completed){
          return (
            <div className='task-container__list__completed' key={idx}>
              <i className="far fa-check-square completed-icon"></i>
              <p>{task.category} - {task.details}</p>
          </div>
          )
        }
      })
      incomplete = Object.values(currentTasks).map((task, idx) => {
        if ((!task.completed && id !== currentUser.id && currentHelpType) || (!currentUser.helpType)){
          return (
            <div className='task-container__list__incomplete' key={idx}>
              <div className="tasks__checkbox" key={idx}>{task.category} - {task.details}</div><br />
            </div>
          )
        } else if (!task.completed && !user.helpType && currentUser.helpType) {
          return (
            <div className='task-container__list__incomplete' key={idx}>
              {!task.helperId ? 
              <i id={task.id} name='iWillHelp' onClick={alterTask} className="fas fa-hands-helping tasks__helping-hands-icon"></i> : null  }
              <div className="tasks__checkbox">{task.category} - {task.details}</div><br />
            </div>
          )
        } else if (!task.completed){
          return(
            <div className='task-container__list__incomplete' key={idx}>
              <input className='task-list__checkbox' type="checkbox" id={task.id} name='checkbox' onClick={alterTask} />
              <label className="tasks__checkbox" key={task.id} htmlFor={task.id}>{task.category} - {task.details}</label><br />
            </div>
          )
        }
      })
  }

  return (
    <div className='tasks-container'>
      <div className='tabs'>
        <h1 className='tabs-header__name'>Tasks</h1>
        <ul className='tab-header'>
          <li className='tab-header__incomplete show'>
            <NavLink onClick={tabHide} className='navlinks' to={`/users/${urlId}/tasks/incomplete`}>
              Incomplete
            </NavLink>
          </li>
          <li className='tab-header__complete'>
            <NavLink onClick={tabHide} className='navlinks' to={`/users/${urlId}/tasks/completed`}>
              Completed
            </NavLink>
          </li>
      </ul>
      <Switch>
        <Route path={`/users/${urlId}/tasks/completed`}>
          <div className='tab-content'>
          {complete}
          </div>
        </Route>
        <Route path={`/users/${urlId}/tasks/incomplete`}>
            <div className='tab-content'>
              {currentUser.id === user.id && !currentUser.helpType ?
                <div className='tasks__addTask'>
                  <form onSubmit={handleSubmit}>
                  <label className='tasks__type__choice' htmlFor="type">Type:</label>
                  <select className='tasks-type__selector' id ='type' name="type" onChange={e => setChoreType(e.target.value)}>
                    <option value='House Chores' required>House Chores</option>
                    <option value='Yard Work' required>Yard Work</option>
                    <option value='Grocery Shopping' required>Grocery Shopping</option>
                    <option value='Other' required>Other</option>
                  </select>
                  <input className='tasks__addTask__input'
                    value={taskDetails}
                    type='text'
                    onChange={ e => setTaskDetails(e.target.value) }
                    required
                    placeholder='I need help with...' />
                    <input className='tasks__hidden-submit' type="submit" />
                  </form>
                </div> : null}
              {incomplete}
            </div>
        </Route>
      </Switch>
      </div>
    </div>
  )
}

export default Tasks;