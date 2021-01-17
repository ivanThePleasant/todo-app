// This component holds the entirity of the todo list that is rendered in the app
// This component has a child component TodoListItem which represent a single entry on the todo list

import React from 'react'
import TodoListItem from '../todo-list-item'
import './todo-list.css'


const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => { //destructuring todos from props

    const elements = todos.map((item) => { //mapping each element on the todos array to the JSX layout
        
      const { id, ...itemProps } = item //destructuring id from item object in order NOT to pass it to TodoListItem

      return (
        <li key={id} className="list-group-item"> 
          <TodoListItem 
            {...itemProps }
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)} /> 
        </li>
      ) // using spread operator to spread the object on each item (without unnecessary id prop)
    })

    return (
      <ul className="list-group todo-list">
        {elements}
      </ul>
    )
}

export default TodoList