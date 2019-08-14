import React from 'react'

function ListItem ({ todo, handleChange, handleRemove }) {
  const [isEditing, setIsEditing] = React.useState(false)

  function toggleEdit () {
    setIsEditing(!isEditing)
  }

  return (
    <li className='listItem'>
      {isEditing ? (
        <input
          autoFocus
          name='name'
          type='text'
          placeholder='Edit todo'
          value={todo.name}
          onChange={handleChange}
          onBlur={toggleEdit}
        />
      ) : (
        <span onClick={toggleEdit}>
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

export default ListItem
