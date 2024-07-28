import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let id = 0

const Todo = props => (
  <li>
    <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle} />
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
)

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    }
  }

  addTodo() {
    const text = prompt("Todo text please");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }],
    })
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }
  toggleTodo(id) {
    this.setstate({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }


  render() {
    return (
      <div>
        <div>Todo count: {this.state.todos.length}</div>
        <div>Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</div>
        <button onClick={() => this.addTodo()}>Add Todo</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo} />
          ))}
        </ul>
      </div>
    )
  }
}
export default App
