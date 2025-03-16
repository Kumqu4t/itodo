import React from "react";
import "../css/Todoitem.css";

const TodoItem = ({ todo, deleteTodo, toggleComplete }) => {
	return (
		<li className={`todo-item ${todo.completed ? "completed" : ""}`}>
			<div className="todo-text-container">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => toggleComplete(todo.id)}
				/>
				<div className="todo-details">
					<div className="todo-title">{todo.title}</div>
					<div className="todo-memo">{todo.memo}</div>
				</div>
			</div>
			<button onClick={() => deleteTodo(todo.id)}>삭제</button>
		</li>
	);
};

export default TodoItem;
