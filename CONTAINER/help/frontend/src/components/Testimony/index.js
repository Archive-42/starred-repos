import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Testimony.css';
import * as TestimonyActions from '../../store/testimony'


const Testimony = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.users.person)
  const currentTestimony = useSelector(state => state.testimony.testimony)
  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState('')
  const [comment2, setComment2] = useState('')
  const [commentEdit, setCommentEdit] = useState(false)
  const [commentFirstName, setCommentFirstName] = useState([])
  const [currentTarget, setCurrentTarget] = useState()
  const userId = user.id;
  const commenterId = currentUser.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(TestimonyActions.testimonyAdd({ userId, commenterId, comment }))
    .then(() => setComment(''))
    return
  };
  
  const handleEdit = (e) => {
    let parent = document.getElementById('testimony-comments-holder-mama')
    let child = e.target.parentElement.parentElement.parentElement
    let indexNum = [...parent.children].indexOf(child)
    setCurrentTarget(currentTestimony[indexNum].id)
    setComment2(currentTestimony[indexNum].comment)
    if (!commentEdit) {
      setCommentEdit(true)
    } else if (commentEdit && child.contains(document.querySelector('.edit-and-delete-form'))) {
      let primaryKey = parseInt(currentTestimony[indexNum].id, 10)
      let comment = comment2
        dispatch(TestimonyActions.testimonyUpdate({ primaryKey, comment }))
          .then(() => setComment2(''))
      setCommentEdit(false)
      return
    }
  }

  const handleDelete = (e) => {
    let parent = document.getElementById('testimony-comments-holder-mama')
    let child = e.target.parentElement.parentElement.parentElement
    let indexNum = [...parent.children].indexOf(child)
    let id = currentTestimony[indexNum].id
    dispatch(TestimonyActions.testimonyDelete(id))
      .then(() => setCurrentTarget())
    return
  }

  useEffect(() => {
    dispatch(TestimonyActions.testimonySearch({
      userId
    })).then((res) => setCommentFirstName(res.data.commenters))
      .then(() => setIsLoaded(true))
  }, [dispatch, setComment, comment]);

  let comments;
  let i = -1;
  if (isLoaded) {
    comments = Object.values(currentTestimony).map((testimony, idx) => {
      i += 1
      if (testimony.commenterId === currentUser.id) {
        return (
          <div className='testimony-individual-container' key={idx}>
            <div className='testimony-individual-header'>
              <a href={`/users/${testimony.commenterId}`}>{commentFirstName[i]} </a>
              <div className='edit-and-delete'>
                <i className="fas fa-edit edit-icon" onClick={handleEdit}></i>
                <i className="fas fa-minus-square" onClick={handleDelete}></i>
              </div>
            </div>
            {commentEdit && testimony.id === currentTarget ?
              <form className='edit-and-delete-form'>
                <textarea className='testimony-testify-text'
                value={comment2}
                name= 'testify'
                onChange={e => setComment2(e.target.value)}/>
              </form>
              :
            <p className='testimony-individual-body'>{testimony.comment}</p>
            }
          </div>
        )
      } else {
        return (
          <div className='testimony-individual-container' key={idx}>
            <div className='testimony-individual-header'>
              <a href={`/users/${testimony.commenterId}`}>{commentFirstName[i]} </a>
              <div></div>
            </div>
            <p className='testimony-individual-body'>{testimony.comment}</p>
          </div>
        )
      }
    })
  }

  return (
    <div className='testimony-container'>
      <h1 className='testimony-header__name'>Testimony</h1>
      {currentUser.id !== user.id ?
        <div className='testimony-form'>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='testimony-type-choice' htmlFor="testify">Testify</label>
              <i onClick={ handleSubmit } className="fas fa-share-square"></i>
            </div>
              {user.helpType ? 
                <textarea id='textarea-submit' className='testimony-testify-text'
                value={comment}
                name= 'testify'
                onChange={e => setComment(e.target.value)}
                required
                  placeholder={`${user.firstName} is an amazing help because...`} />
                :
                <textarea id='textarea-submit' className='testimony-testify-text'
                value={comment}
                name= 'testify'
                onChange={e => setComment(e.target.value)}
                required
                placeholder={`I loved helping ${user.firstName} because...`} />
            }
          </form>
        </div> : null}
      <div id = 'testimony-comments-holder-mama' className='testimony-comments-holder'>{ comments }</div>
    </div>
  )
}

export default Testimony;