import './CSS/TodoItems.css';
import tick from './Assets/tick.png';
import cross from './Assets/cross.png';
import not_tick from './Assets/not_tick.png';

const TodoItems = ({no, display, text, setTodos}) => {
    const delToDos = (no) => {
        let data = JSON.parse(localStorage.getItem('todos'));
        data = data.filter((todo)=> todo.no!==no);
        setTodos(data);

        let count = JSON.parse(localStorage.getItem('todos_count'));
        count--;
        localStorage.setItem('todos_count',count);
    }

    const toggle = (no) => {
        //to modify the data
        let data = JSON.parse(localStorage.getItem('todos'));
        for(let i = 0; i<data.length;i++){
            if(data[i].no === no){
                if(data[i].display ===""){
                    data[i].display = "line-through";
                } else {
                    data[i].display = "";
                }
                break;
            }
        }
        setTodos(data);
    }

  return (
    <div className='todo-items'>
        <div className={`todo-items-container ${display}`} onClick={()=>{toggle(no)}}>
            {display===""?<img src={not_tick} /> : <img src={tick} />}
            <div className="todo-items-text">{text}</div>
        </div>
        <img className='todo-items-cross-icon' src={cross} onClick={()=>{delToDos(no)}}/>
    </div>
  )
}

export default TodoItems