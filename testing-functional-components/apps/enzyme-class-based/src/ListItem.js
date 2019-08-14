import React from 'react'

class ListItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false
    }

    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit () {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render () {
    const { todo, handleChange, handleRemove } = this.props

    return (
      <li className='listItem'>
        {this.state.isEditing ? (
          <input
            autoFocus
            name='name'
            type='text'
            value={todo.name}
            onChange={handleChange}
            onBlur={this.toggleEdit}
          />
        ) : (
          <span onClick={this.toggleEdit}>
            {todo.name}
          </span>
        )}

        <input
          name='complete'
          type='checkbox'
          checked={todo.complete}
          onChange={handleChange}
        />

        <div onClick={handleRemove} className='listItemRemove'>x</div>
      </li>
    )
  }
}
ListItem.displayName = 'ListItem'

export default ListItem
