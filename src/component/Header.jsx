import "./Header.css";
import HeaderButton from "./HeaderButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFilteredTodos from '../hooks/useFilterTodos'
import { ko } from "date-fns/locale";  
import { FaPlusCircle } from "react-icons/fa";  
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';


export default function Header({todos, onCreate, filteredTodos, selectedDate, setSelectedDate}) {

    // active에 들어갈거, done에 들어갈거 필터링 하는 리엑트 훅 호출. 
    const { active, done } = useFilteredTodos(filteredTodos, selectedDate);    
    
    // 남은 일, 끝난 일 랜더링 하는 변수
    const left_task = active.length 
    const done_task = done.length


    const previousDay = () => { 
        if (!selectedDate) return;
        const prevDate = new Date(selectedDate); // 기존 날짜 복사
        prevDate.setDate(prevDate.getDate() - 1); // 하루 전으로 변경
        setSelectedDate(prevDate);
    }

    const nextDay = () => {
        if (!selectedDate) return;
        const nextDate = new Date(selectedDate); // 기존 날짜 복사
        nextDate.setDate(nextDate.getDate() + 1); // 하루 전으로 변경
        setSelectedDate(nextDate);
    }

    // 이것 좀 어려웠음.
    // { active: 0, done: 0 } 이런 형태로 객체 추가함.
    // isDone -> true 면 { active: 0, done: 1 }
    // isDone -> false 면 { active: 1, done: 0 }

    // acc[dateKey] 이건 acc[Fri Feb 16 2024] = { active: 0, done: 0 } 이렇게 나오는거임
    // 그래서 acc를 리턴하면 todoStatusByDate에 다음과 같은 형태가 됨됨
    /*
        {
        "Fri Feb 16 2024": { active: 1, done: 0 },
        "Sat Feb 17 2024": { active: 1, done: 0 }
        }
    */
    const todoStatusByDate = todos.reduce((acc, todo) => {
        const dateKey = new Date(todo.time).toDateString();
        if (!acc[dateKey]) acc[dateKey] = { active: 0, done: 0 };
        if (todo.isDone) acc[dateKey].done += 1;
        else acc[dateKey].active += 1;
        return acc;
    }, {});


    // date는 dayClassName={highlightWithDot} 여기서 각 날짜(date)에 대해 highlightWithDot(date)를 자동으로 실행함.
    // active, done에 대해서 "has-active", "has-done"을 출력함.
    const highlightWithDot = (date) => {
        const dateKey = date.toDateString();
        if (todoStatusByDate[dateKey]) {
            if (todoStatusByDate[dateKey].active > 0) return "has-active"; // 빨간 점
            if (todoStatusByDate[dateKey].done > 0) return "has-done"; // 파란 점
        }
        return null;
    };


    return (
        <header className="Header">
            <section className="above ">
                <div className="date">
                    <HeaderButton   onClick={previousDay} text={<ChevronLeft size={30} className="left"/>}/>
                    <section className="only_date">
                        <h2>{selectedDate.getDate()}th, &nbsp;&nbsp;{selectedDate.toLocaleString("en-US", { month: "short" })}</h2>
                        <h5>
                            {selectedDate.getFullYear()}
                            <DatePicker     
                            className="calender"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            locale={ko} 
                            dayClassName={highlightWithDot}
                            customInput={
                                <button>
                                📅
                                </button>
                            }
                            />
                        </h5>
                    </section>
                    <HeaderButton text={<ChevronRight size={30} className="rignt"/>} onClick={nextDay}/>
                </div>

                <section className="task">
                        <h5 className="notdone">{left_task}{'\u00A0'}<span>task Done</span></h5>
                        <h5 className="done">{done_task}{'\u00A0'}<span>task Left</span></h5>
                </section>
            </section>

            <div className="under">
                <hr/>
                <FaPlusCircle  onClick={onCreate} className="summit"/>
            </div>
        </header>
        );
}