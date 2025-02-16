import { useState, useEffect } from 'react'
import Item from './Item'
import './TodoList.css'
import useFilteredTodos from '../hooks/useFilterTodos'

export default function TodoList({selectedDate, moveTodos, onDelete, filteredTodos, updateContent }) {
    
    const { active, done } = useFilteredTodos(filteredTodos, selectedDate);


    return(
        <div className='TodoList'> 
            <section className='active'>
                <h2>Active</h2>
                <div className='active_items'>
                    {active.map((item)=>{
                        return (<Item 
                            key={item.id} 
                            id={item.id}
                            isDone={item.isDone}
                            time={item.time}
                            type={'del'}
                            moveTodos={moveTodos}
                            onDelete={onDelete}
                            updateContent={updateContent}
                        />
                    )})}
                </div>
            </section>
            <hr/>
            <section className='done'>
                <h2>Done</h2>
                <div className='done_items'>
                    {done.map((item)=>{
                        return (<Item 
                            key={item.id} 
                            id={item.id}
                            isDone={item.isDone}
                            time={item.time}
                            content={item.content}
                            type={'del'}
                            moveTodos={moveTodos}
                            onDelete={onDelete}
                            updateContent={updateContent}
                        />
                    )})}
                </div>
            </section>

        </div>
    )
}