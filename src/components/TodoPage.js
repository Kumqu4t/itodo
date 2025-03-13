import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm"
import "../css/TodoPage.css"

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        console.log("로컬 스토리지: ", savedTodos);
        setTodos(savedTodos);
    }, []);
    
    useEffect(() => {
    if (todos.length > 0) {  // todos가 비어있지 않을 때만 저장
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log("두 번째 useEffect: ", todos);
    }
}, [todos]);


    const addTodo = (newTodoItem) => {
        setTodos([{ id: Date.now(), completed: false, ...newTodoItem }, ...todos]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));  // id에 해당하는 todo 삭제
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div>
            <h1>Todo App</h1>
            <TodoList 
                todos={todos} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete} 
            />
            {!isAdding && (
                <button className="addTodo-button" onClick={() => setIsAdding(true)}>+ 새로운 미리 알림</button>
            )}
            {isAdding && <div className="add-todo-overlay" onClick={() => setIsAdding(false)}></div>}
            {isAdding && <AddTodoForm addTodo={addTodo} onClose={() => setIsAdding(false)} />}
        </div>
    );
};

export default TodoPage;