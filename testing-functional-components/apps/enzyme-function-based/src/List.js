import React from 'react'
import ListItem from './ListItem'

const template = {
  name: 'New todo',
  complete: false
}

function List () {
  const [todos, setTodos] = React.useState([])

  React.useEffect(() => {
    const newTodos = JSON.parse(window.localStorage.getItem('todos'))
    newTodos && setTodos(newTodos)
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function create (e) {
    const newTodos = todos.slice(0)
    newTodos.push(template)
    setTodos(newTodos)
  }

  function handleChange (e, i) {
    let { value } = e.target
    const { name, type, checked } = e.target
    if (type === 'checkbox') value = checked
    const newTodos = todos.slice(0)
    newTodos[i][name] = value
    setTodos(newTodos)
  }

  function handleRemove (i) {
    const newTodos = todos.slice(0)
    newTodos.splice(i, 1)
    setTodos(newTodos)
  }

  return (
    <div>
      <div id='chrome'>
        <button onClick={create}>
          Add a todo
        </button>
      </div>

      <ul id='list'>
        {todos.map((todo, i) => {
          return (
            <ListItem
              handleChange={(e) => handleChange(e, i)}
              handleRemove={() => handleRemove(i)}
              key={i}
              todo={todo}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default List
