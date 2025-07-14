/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import KanbanSection from './KanbanViewSection'

function KanbanViewContainer(props) {
  const { tasks, sectionsData, setTasks, setSectionsData, updateSectionsData } =
    props

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex justify-evenly h-screen">
          {sectionsData &&
            Object.keys(sectionsData).map((section) => (
              <KanbanSection
                section={section}
                taskIds={sectionsData[section]}
                tasks={tasks}
                key={section}
                updateSectionsData={updateSectionsData}
              />
            ))}
        </div>
      </DndProvider>
    </>
  )
}

export default KanbanViewContainer
