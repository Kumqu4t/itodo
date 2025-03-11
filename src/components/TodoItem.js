import React from 'react';

const TodoItem = ({todo, deleteTodo, toggleComplete}) => {
    return (
        <li className={`todo item ${todo.completed ? 'completed' : ""}`}>
            <div className='todo-text-container'>
                <input type = "checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        />
            <span className="todo-text">{todo.text}</span>
            <span className="todo-date">{todo.date}</span>
            </div>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;