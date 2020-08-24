import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, wipeNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotification('Anecdote created'))
    setTimeout(() => dispatch(wipeNotification()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default NewAnecdote