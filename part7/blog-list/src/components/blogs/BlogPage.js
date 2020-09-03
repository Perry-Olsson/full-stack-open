import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLikeBlog } from '../../hooks'
import { addComment, deleteComment } from '../../reducers/blogReducer'
import AddComment from './AddComment'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const like = useLikeBlog(blog)
  const user = useSelector(state => state.user)

  if (!blog)
    return null

  const createComment = async (event, comment) => {
    event.preventDefault()
    dispatch(addComment({ value: comment, blog, user }))
  }

  const del = async (commentId) => {
    dispatch(deleteComment(blog.id, commentId))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href='/'>{blog.url}</a></p>
      <p>{blog.likes} likes<button style={{ marginLeft: '1em', width: 'fit-content' }} onClick={like} >like</button></p>
      <p>added by <b>{blog.user.username}</b></p>
      <h4>Comments:</h4>
      <AddComment createComment={createComment}/>
      <div>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i} >{comment.comment}
              {user.username === comment.user &&
              <button onClick={() => del(comment.id)} style={{ width: 'fit-content', marginLeft: '1em' }}>
              delete
              </button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogPage