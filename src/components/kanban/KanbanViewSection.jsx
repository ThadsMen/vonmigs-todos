/* eslint-disable react/prop-types */
import { useDrop } from 'react-dnd'
import { ItemTypes } from './dragtypes'
import KanbanViewItem from './KanbanViewItem'

function KanbanSection(props) {
  const { section, taskIds, tasks, updateSectionsData } = props
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => {
      updateSectionsData(item, section)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl pb-2 w-fit">{section}</div>
      <div
        className={`w-80 h-screen rounded-[1vw] pt-5 ${
          isOver ? 'bg-neutral-600' : ''
        }`}
        ref={drop}
      >
        {taskIds.map((taskId) => (
          <KanbanViewItem
            task={tasks.find((task) => task.id == taskId)}
            key={taskId}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanSection
