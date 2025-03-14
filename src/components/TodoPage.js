import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "../css/TodoPage.css";

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState(2); // 0: 오늘, 1: 예정, 2: 전체


    useEffect(() => {
        // 로딩테스트
        // setTimeout(() => {
            const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            setTodos(savedTodos);
            setIsLoading(false);
        // }, 2000); // 2초 후에 로딩 상태를 false로 바꾸기
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    // 로딩 관리
    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중 메시지
    }

    const addTodo = (newTodoItem) => {
        setTodos([{ id: Date.now(), completed: false, ...newTodoItem }, ...todos]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };


    const currentDate = new Date().setHours(0, 0, 0, 0); // 오늘

    // 오늘, 예정, 전체 할 일 개수 구하기
    const getTodoCount = (index) => {
        if (index === 0) {
            return todos.filter(todo => new Date(todo.date).setHours(0, 0, 0, 0) === currentDate).length;
        } else if (index === 1) {
            return todos.filter(todo => new Date(todo.date).setHours(0, 0, 0, 0) > currentDate).length;
        } else {
            return todos.length;
        }
    };


    return (
        <div>
            <h1>Todo App</h1>

            <div className="tabs">
                {["오늘", "예정", "전체"].map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab} {getTodoCount(index)}

                    </button>
                ))}
            </div>

            <TodoList 
                todos={todos} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete}
                activeTab={activeTab} 
            />

            {!isAdding && (
                <button className="addTodo-button" onClick={() => setIsAdding(true)}>
                    + 새로운 미리 알림
                </button>
            )}
            {isAdding && <div className="add-todo-overlay" onClick={() => setIsAdding(false)}></div>}
            {isAdding && <AddTodoForm addTodo={addTodo} onClose={() => setIsAdding(false)} />}
        </div>
    );
};

export default TodoPage;