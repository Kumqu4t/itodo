import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleComplete }) {
    const today = new Date().setHours(0, 0, 0, 0); // 오늘 날짜 (시간 제외)

    // 날짜별로 그룹화
    const groupedTodos = todos.reduce((acc, todo) => {
        const todoDate = new Date(todo.date).setHours(0, 0, 0, 0); // todo의 날짜도 시간 제외하고 비교
        let groupDate;

        if (todoDate < today) {
            groupDate = "마감일 지남"; // 오늘 이전이면 마감일 지남
        } else if (todoDate === today) {
            groupDate = "오늘"; // 오늘 날짜는 "오늘"
        } else {
            groupDate = todo.date; // 미래 날짜는 그대로 표시
        }

        (acc[groupDate] = acc[groupDate] || []).push(todo);
        return acc;
    }, {});

    // "마감일 지남", "오늘"을 맨 앞에 두고, 나머지 날짜들을 정렬
    const sortedGroupedTodos = [
        "마감일 지남", 
        "오늘",
        ...Object.keys(groupedTodos).filter(date => date !== "마감일 지남" && date !== "오늘").sort()
    ];

    return (
        <div>
            {sortedGroupedTodos.map(date => {
                return (
                    <div key={date}>
                        <h3>{date === "마감일 지남" ? "마감일 지남" : date === "오늘" ? "오늘" : new Date(date).toLocaleDateString()}</h3>
                        <ul>
                            {groupedTodos[date] && groupedTodos[date].map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    deleteTodo={deleteTodo}
                                    toggleComplete={toggleComplete}
                                />
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default TodoList;