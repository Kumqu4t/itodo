import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodoForm = ({ addTodo, onClose }) => {
    const [newTitle, setNewTitle] = useState("");  // newTodo 상태 추가
    const [newMemo, setNewMemo] = useState("");  // newTodo 상태 추가
    const [newDate, setNewDate] = useState("");  // 새로운 날짜 상태 추가

    const handleSubmit = () => {
        if (newTitle.trim() === "" || !newDate) {  // 빈 문자열 입력 방지
            toast.error("할 일과 날짜를 모두 입력해 주세요.");
            return;
        }
        addTodo({ title: newTitle, memo: newMemo, date: newDate });  // 새로운 todo 추가
        onClose();
    };

    return (
        <div className="add-todo-form">
            <input
                type="text"
                placeholder="제목"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}  // newTodo 업데이트
            />
            <input
                type="text"
                placeholder="메모"
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}  // newTodo 업데이트
            />
            <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}  // 날짜 상태 업데이트
            />
            <button onClick={handleSubmit}>추가</button>
            <button onClick={onClose}>취소</button>

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

export default AddTodoForm;