import { useState } from "react";
import "./Item.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Item({ content, id, isDone, time, moveTodos, onDelete, updateContent }) {
    const [text, setText] = useState(content || "");
    const [shake, setShake] = useState(false);

    const handleContent = (e) => {
        const newValue = e.target.value;
        setText(newValue);
        updateContent(id, newValue);
    };

    const handleMoveTodos = () => {
        if (!text.trim()) {
            setShake(true);
            
            // 0.5초 후 흔들림 해제
            setTimeout(() => {
                setShake(false);
            }, 500);
            
            return;
        }

        moveTodos(id, text);
    };

    return (
        <div className={`Item ${isDone ? "done" : ""}`}>
            <input 
                className="isDone"
                type="checkbox" 
                checked={isDone} 
                onChange={handleMoveTodos} 
                disabled={isDone}
            />
            <input 
                className={`content ${shake ? "shake" : ""}`}
                type="text" 
                placeholder="  오늘의 할 일은?" 
                onChange={handleContent}
                value={text}
                disabled={isDone}
            />
            <h5 className="time">
                {new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
            </h5>
            <RiDeleteBin5Fill className="del" onClick={() => onDelete(id)} />
        </div>
    );
}
