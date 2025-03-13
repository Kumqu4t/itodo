import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleComplete }) {
    // 날짜별로 그룹화
    const groupedTodos = todos.reduce((acc, todo) => {
        (acc[todo.date] = acc[todo.date] || []).push(todo);
        return acc;
    }, {});

    console.log("groupedTodos: ", groupedTodos);

    return (
        <div>
            {Object.keys(groupedTodos).map(date => (
                <div key={date}>
                    <h3>{date}</h3> {/* 날짜 헤더 */}
                    <ul>
                        {groupedTodos[date].map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                deleteTodo={deleteTodo}
                                toggleComplete={toggleComplete}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default TodoList;