import React, { useState } from 'react';
import { Canvas } from 'react'
import "./App.css"
import { Mesh } from 'three';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editIndex !== null) {
      // Edit existing todo
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new todo
      setTodos([...todos, { text: inputValue, completed: false }]);
    }
    setInputValue('');
  }

  function handleEdit(index) {
    setInputValue(todos[index].text);
    setEditIndex(index);
  }

  // function handleRemove(index) {
  //   const updatedTodos = todos.filter((_, i) => i !== index);
  //   setTodos(updatedTodos);
  // }

  function handleToggleCompleted(index) {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function handleDeleteCompleted() {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  }

  return (
    <div className='container'>
      <mesh>
        <boxBufferGeometry atach="geometry" />
        <meshLandbortMaterial attach='material' color='red' />
      </mesh>
      <h1>Todo List</h1>
      <button className='btn' onClick={handleDeleteCompleted}>Delete Completed</button>
      <form onSubmit={handleSubmit}>
        <input placeholder='What the task today?' className='input' type='text' value={inputValue} onChange={handleChange} />
        <button className='btn' type='submit'>{editIndex !== null ? 'Update Todo' : 'Add Todo'}</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li className='list' key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(index)}
              />
            </div>
            {todo.text}
            <div className='btns'>
              <button className='btn edit' onClick={() => handleEdit(index)}>Edit</button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
