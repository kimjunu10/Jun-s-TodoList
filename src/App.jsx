import { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import TodoList from './component/TodoList';

function App() {
  const [todos, setTodos] = useState([]); // id, isDone, content, time이 하나의 객체로, 객체들을 배열로 저장
  const [selectedDate, setSelectedDate] = useState(new Date()); // selectedDate에 해당하는 날짜 즉, 선택한 날짜 저장
  const [filteredTodos, setFilteredTodos] = useState([]); // selectedDate에 해당하는 날에 대한 TodoList 만 필터링
  const [isLoading, setIsLoading] = useState(true); // 혹시모를 로딩 상태 추가

  const idRef = useRef(0); // id값을 useRef로로

  /* localStorage에 저장하기 위한 useEffect */
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos'); 

    if (!storedTodos) { 
      setIsLoading(false); // 데이터가 없으면 바로 로딩 종료
      return;
    }

    const parsedTodos = JSON.parse(storedTodos);
    
    if (!Array.isArray(parsedTodos)) {
      setIsLoading(false); // 데이터가 배열이 아니면 로딩 종료
      return;
    }

    setTodos(parsedTodos);

    // 현재 id보다 하나 큰 id에 객체 할당하도록..
    let maxId = 0;
    parsedTodos.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;

    setIsLoading(false); 
  }, []);

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  // 생성 -> + 버튼 누르면 생성 (FaPlusCircle 여기)
  function onCreate() {
    setTodos([
      ...todos,
      {
        id: idRef.current++, 
        isDone: false,
        content: '',
        time: new Date().toISOString(),
      },
    ]);
  }

  // 삭제 -> Item에서 id넘기면 그 id에 해당하는 객체 데이터 없애버림.
  const onDelete = (id) => {
    setTodos((todos) => todos.filter((item) => item.id !== id));
  };

  // 체크버튼 누르면 active 에서 done으로 이동 -> Item에서 id랑 content 받아서 cotent비었으면 리턴. 리턴하면 Item 컴포넌트에서 shake하도록 state설정 해둠
  const moveTodos = (id, content) => {
    if (!content.trim()) {
        return;
    }

    // 만약 content가 차있으면 체크버튼 클릭 했을때 active -> done 으로 이동
    // isDone의 값을 바꿔서 리랜더 하게 하고 TodoList에서 isDone의 여부에 맞게 거름.
    setTodos((prevTodos) =>
        prevTodos.map((item) =>
            item.id === id ? { ...item, isDone: !item.isDone } : item
        )
    );
};

  // Item에서 content입력 할때마다 state업데이트 해서 이거 호출하면 content업데이트함.
  const updateContent = (id, content) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, content: content } : item
      )
    );
  };

  // todos, selectedDate바뀌었을때 실행해서 해당 날짜에 따른 그거 todos필터링함.
  useEffect(() => {
    const filtered = todos.filter((todo) => {
      const todoDate = new Date(todo.time).toDateString();
      const selected = selectedDate.toDateString();
      return todoDate === selected;
    });

    setFilteredTodos(filtered);
  }, [todos, selectedDate]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='App'>
      <Header
        todos={todos}
        filteredTodos={filteredTodos}
        onCreate={onCreate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TodoList
        moveTodos={moveTodos}
        onDelete={onDelete}
        updateContent={updateContent}
        filteredTodos={filteredTodos}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;
