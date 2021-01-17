// importing modules
import React, { Component } from 'react'

// importing own components
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

// importing css
import './app.css';

// class declaration
export default class App extends Component {

  maxID = 100; // required for generating id property on each todData item as no id auto-generator (like uuid) is connected

  state = {
    todoData: [ // mock data for the app
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '', // state property used by search function
    filter: 'all' // state property used by filter function, can be all, active or done. All is default
  }

  createTodoItem(label) { // function to set up mock todo data in the state todoData array and to construct new items added to the todo list
    return {
      label,
      important: false,
      done: false,
      id: this.maxID++
    }
  }

  deleteItem = (id) => { // function to delete a todo item from the array
    this.setState(({ todoData }) => {
      const filteredTodoData = todoData.filter((el) => el.id !== id)
      return {
        todoData: filteredTodoData
      }
    })
  }

  addItem = (text) => { // add new item to the todo array
    const newItem = this.createTodoItem(text)

    this.setState((state) => {
      const todoData = state.todoData
      const newArr = [
        ...todoData,
        newItem
      ]

      return {
        todoData: newArr
      }
    })
  }

  toggleProperty(arr, id, propName) { // function to toggle property names of each todo item, used by onToggleImportant and onToggleDone

      const idx = arr.findIndex((el) => el.id === id)

      const oldItem = arr[idx]
      const newItem = { ...oldItem, [propName]: !oldItem[propName] }

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ]
  }

  onToggleImportant = (id) => { // toggles the "important" property of a todo element
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => { // toggles the "done" property of a todo element
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onSearchChange = (term) => { // changes the state of term from SearchPanel component
    this.setState({term})
  }

  onFilterChange = (filter) => { // changes the state of filter from ItemStatusFilter component
    this.setState({ filter })
  }

  search(items, term) { // filters todoData array when term state changes (user inputs text in search field)
    if(term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) { // filters todoData array when filter state changes (user picks status filter)
    switch(filter) {
      case 'all' :
        return items;
      case 'active' :
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default :
        return items
    }
  }

  render() {

    const doneCount = this.state.todoData.filter((item) => item.done).length
    const todoCount = this.state.todoData.length - doneCount
    const visibleItems = this.filter(this.search(this.state.todoData, this.state.term), this.state.filter)

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={this.state.filter}
                            onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />

        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }
  
}
