import { useState, useEffect } from 'react'
import ListViewItem from './ListViewItem'
import { getTasks } from '../../services/apiService'

function ListViewContainer() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks().then((data) => setTasks(data))
  }, [])

  return (
    <ul role="list" className="divide-y divide-[#646669]">
      {tasks.map((task) => (
        <ListViewItem task={task} key={task.id} />
      ))}
    </ul>
  )
}

export default ListViewContainer
