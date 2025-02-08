import { useState, useEffect } from 'react'
import ListViewItem from "./ListViewItem";
import { fetchTodos } from "../../services/apiService";

function ListViewContainer(){

  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    const data = fetchTodos();
    setTodos(data);
  }, [])
  
  return (
    <ul role="list" className="divide-y divide-[#646669]">
      {todos.map((task) => (
        < ListViewItem task={task} key={task.task_id} />
      ))}
    </ul>
  )
};

export default ListViewContainer;