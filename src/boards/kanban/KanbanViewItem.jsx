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
      opacity: isDragging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}
    className = "border-2 border-double border-[#94603F]"
    >
      {task.title}
    </div>
  );
}

export default KanbanViewItem;