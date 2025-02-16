import { useState, useEffect } from "react";

//이건 진짜 내가 생각해도 너무 잘만들었다 헤헤
// idDone에 따라 active, done state로 필터링
export default function useFilteredTodos(todos, selectedDate) {
    const [active, setActive] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        if (!todos) return;

        setActive(todos.filter((item) => !item.isDone));
        setDone(todos.filter((item) => item.isDone));

    }, [todos, selectedDate]);

    return { active, done };
}