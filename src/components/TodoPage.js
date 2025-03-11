import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");  // newTodo 상태 추가
    const [newDate, setNewDate] = useState("");  // 새로운 날짜 상태 추가

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

    const addTodo = () => {
        if (newTodo.trim() === "" || !newDate.length) {  // 빈 문자열 입력 방지
            toast.error("할 일과 날짜를 모두 입력해 주세요.");
            return;
        }
        const newTodoItem = {
            id: Date.now(),  // 고유 id (현재 시간 기반)
            text: newTodo,
            completed: false,
            date: newDate,
        };
        setTodos([newTodoItem, ...todos]);  // 새로운 todo 추가
        setNewTodo("");  // 입력 초기화
        setNewDate("");  // 입력 초기화
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
            <input
                type="text"
                placeholder="할 일 입력"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}  // newTodo 업데이트
            />
            <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}  // 날짜 상태 업데이트
            />
            <button onClick={addTodo}>Add Todo</button>  {/* Add 버튼 클릭 시 todo 추가 */}
            <TodoList 
                todos={todos} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete} 
            />
            <ToastContainer 
                position="top-center"
                style={{
                    marginTop: '100px',
                }}
                autoClose={3000}
            />
        </div>
    );
};

export default TodoPage;