/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDrop } from 'react-dnd';
import { ItemTypes } from './dragtypes';
import KanbanViewItem from './KanbanViewItem';

function KanbanSection(props) {

  const { section, taskIds, tasks, updateBoard } = props
  const [ { isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop: (item) => updateBoard(item.id,section,item.status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()           
      })
    })
  )
  return (
    <div className="flex-col">
      <div className="text-2xl pb-2">{section}</div>
      <div 
        className = "w-80 h-screen border-2 border-[#94603F] rounded-[1vw] pt-5"
        ref={drop}
    >
{/*       {isOver && (
        <div className="h-full w-full opacity-0.5 bg-yellow-300">
        </div>
      )} */}
       {taskIds.map((taskId)=>(
        <KanbanViewItem task={tasks[taskId]} key={taskId}/>
       ))}
    </div>
    </div>
  );
}

export default KanbanSection;