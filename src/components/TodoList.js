import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "../css/TodoList.css";

function TodoList({ todos, deleteTodo, toggleComplete, activeTab }) {
	const today = new Date().setHours(0, 0, 0, 0);
	const [showCompleted, setShowCompleted] = useState(true);

	// 날짜별 그룹화, activeTab 필터링
	const groupedTodos = todos.reduce((acc, todo) => {
		const todoDate = new Date(todo.date).setHours(0, 0, 0, 0);
		let groupDate;

		if (todoDate < today) {
			if (activeTab === 0 || activeTab === 1) return acc; // "오늘" & "예정" 탭에서는 제외
			groupDate = "마감일 지남";
		} else if (todoDate === today) {
			groupDate = "오늘";
		} else {
			if (activeTab === 0) return acc; // "오늘" 탭에서는 미래 일정 제외
			groupDate = todo.date;
		}

		(acc[groupDate] = acc[groupDate] || []).push(todo);
		return acc;
	}, {});

	// 그룹 정렬
	let sortedGroupedTodos = Object.keys(groupedTodos);
	if (activeTab === 2) {
		// "전체" 탭일 때만 "마감일 지남"과 "오늘"을 포함해서 정렬
		sortedGroupedTodos = [
			"마감일 지남",
			"오늘",
			...sortedGroupedTodos
				.filter((date) => date !== "마감일 지남" && date !== "오늘")
				.sort(),
		];
	} else if (activeTab === 1) {
		sortedGroupedTodos = [
			"오늘",
			...sortedGroupedTodos
				.filter((date) => date !== "마감일 지남" && date !== "오늘")
				.sort(),
		];
	} else {
		sortedGroupedTodos = sortedGroupedTodos.sort();
	}

	return (
		<div className="todo-list">
			<div className="showCompletedBtn">
				<button onClick={() => setShowCompleted((prev) => !prev)}>
					{showCompleted ? "완료 숨기기" : "완료 보기"}
				</button>
			</div>
			<div className="todo-list-container">
				{sortedGroupedTodos.map((date) => {
					const filteredTodos = groupedTodos[date].filter(
						(todo) => showCompleted || !todo.completed
					); // 먼저 필터링

					if (filteredTodos.length === 0) return null; // 이 날짜에 남아있는 할 일이 없으면 출력하지 않음

					return (
						<div key={date}>
							<h3>
								{date === "마감일 지남"
									? "마감일 지남"
									: date === "오늘"
									? "오늘"
									: new Date(date).toLocaleDateString()}
							</h3>
							<ul>
								{filteredTodos.map((todo) => (
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
		</div>
	);
}

export default TodoList;
