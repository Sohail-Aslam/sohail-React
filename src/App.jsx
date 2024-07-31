import React, { useState, useEffect, useRef } from 'react';
import "./App.css"
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


  const ballsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX * 92 / window.innerWidth + '%';
      const y = e.clientY * 70 / window.innerHeight + '%';

      ballsRef.current.forEach(ball => {
        if (ball) {
          ball.style.left = `${x / 2}`;
          ball.style.top = `${y / 2}`;
          ball.style.transform = `translate(${x}, ${y})`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className='container'>
      <div className="cat">
        <div className='eyes'>
          <div className="eye">
            <div className="ball" ref={(el) => ballsRef.current[0] = el}></div>
          </div>
          <div className="eye">
            <div className="ball" ref={(el) => ballsRef.current[1] = el}></div>
          </div>
        </div>
      </div>

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
