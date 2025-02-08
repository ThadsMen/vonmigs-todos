/* eslint-disable react/prop-types */
import { ItemTypes } from "./dragtypes";
import { useDrag } from 'react-dnd';
function KanbanViewItem(props) {

  const { task } = props
  const [{ isDragging }, drag ] = useDrag( () => ({
    type: ItemTypes.TASK,
    item: task,
    colect: (monitor) =>({
      isDragging: !!monitor.isDragging()
    }),
  }))
  
  return (
    <div
    ref={drag}
    style={{
      opacity: isDragging ? 1 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}
    className = "border-4 border-[#94603F]  rounded-[1vw] mb-8 mx-2 h-32"
    >

      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
    </div>
  );
}

export default KanbanViewItem;