import React from 'react'
import ListItem from './ListItem'

const template = {
  name: 'New todo',
  complete: false
}

class List extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      index: 0,
      todos: []
    }

    this.todoCreate = this.todoCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount () {
    this.setState({ todos: JSON.parse(window.localStorage.getItem('todos')) || [] })
  }

  todoCreate (e) {
    const todos = this.state.todos.slice(0)
    todos.push(template)
    window.localStorage.setItem('todos', JSON.stringify(todos))
    return this.setState({ todos })
  }

  handleChange (e, i) {
    const todos = this.state.todos.slice(0)
    let { value } = e.target
    const { name, type, checked } = e.target
    if (type === 'checkbox') value = checked
    todos[i][name] = value
    window.localStorage.setItem('todos', JSON.stringify(todos))
    return this.setState({ todos })
  }

  handleRemove (i) {
    const todos = this.state.todos.slice(0)
    todos.splice(i, 1)
    window.localStorage.setItem('todos', JSON.stringify(todos))
    return this.setState({ todos })
  }

  render () {
    return (
      <div>
        <div id='chrome'>
          <button onClick={this.todoCreate}>
            Add a todo
          </button>
        </div>

        <ul id='list'>
          {this.state.todos.map((todo, i) => {
            return (
              <ListItem
                handleChange={(e) => this.handleChange(e, i)}
                handleRemove={() => this.handleRemove(i)}
                key={i}
                todo={todo}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default List
