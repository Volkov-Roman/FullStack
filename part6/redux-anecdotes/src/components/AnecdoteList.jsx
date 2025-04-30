import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted for: "${content}"`, 5))
  }

  const filteredAnecdotes = anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {[...filteredAnecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList
