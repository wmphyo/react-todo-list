import { useState } from 'react';
import './CSS/Todo.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import TodoItems from './TodoItems';

let count = 0;

const Todo = () => {
    const [todos,setTodos] = useState([]);
    const inputRef = useRef(null);
    
    const add = () => {
        setTodos([...todos,{no:count++,text:inputRef.current.value,display:""}]); //add the obj into todos
        inputRef.current.value = ""; //clear the input field data
        localStorage.setItem('todos_count',count);
    }   

    //call items on reload
    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem('todos')));
        count = localStorage.getItem('todos_count');
    },[]);

    useEffect(()=>{
        setTimeout(() => {
            //need to convert into string to store in localStorage
            localStorage.setItem('todos',JSON.stringify(todos));
        }, 100);
    }, [todos]); //statename - when todos get updated, this function will be executed

    return (
        <div className='todo'>
            <div className="todo-header">To-Do List</div>
            <div className="todo-add">
                <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input' />
                <div className="todo-add-btn" onClick={()=>{add()}}>ADD</div>
            </div>
        <div className="todo-list">
            {todos.map((item,index)=>{
                return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
            })}
        </div>
    </div>
  )
}

export default Todo