import { useState} from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import KanbanSection from './KanbanViewSection';

function KanbanViewContainer () {
  const [boardData, setBoardData] = useState({
    tasks: {
      1: { id: 1, title: "Task 1", description: "This is task 1", status: "Not started" },
      2: { id: 2, title: "Task 2", description: "This is task 2", status: "In progress" },
      3: { id: 3, title: "Task 3", description: "This is task 3", status: "Completed" },
      4: { id: 4, title: "Task 4", description: "This is task 4", status: "Not started" },
      5: { id: 5, title: "Task 5", description: "This is task 5", status: "Cancelled" },
      6: { id: 6, title: "Task 6", description: "This is task 6", status: "In progress" },
      7: { id: 7, title: "Task 7", description: "This is task 7", status: "Completed" },
      8: { id: 8, title: "Task 8", description: "This is task 8", status: "Not started" }
    },
    sections: {
      "Not started": [1, 4, 8],
      "In progress": [2, 6],
      "Completed": [3, 7],
      "Cancelled": [5]
    }
  });

  const updateBoard = (taskId, updatedSection, currentSection) => {
    if(updatedSection==currentSection) return;

    const updatedBoardData = { ...boardData }

    const updatedTask = {
      ...updatedBoardData.tasks[taskId],
      status: updatedSection
    }
    updatedBoardData.tasks[taskId] = updatedTask;
    updatedBoardData.sections[currentSection] = updatedBoardData.sections[currentSection].filter(id => id !== taskId)
    updatedBoardData.sections[updatedSection].push(taskId)

    setBoardData(updatedBoardData)
  }  

  
  return(
    <>
      <DndProvider backend={HTML5Backend}>
        <div className = "flex justify-evenly h-screen" >
          {Object.keys(boardData.sections).map((status)=>(
            <KanbanSection status={status} taskIds={boardData.sections[status]} tasks={boardData.tasks} key={status} updateBoard={updateBoard} />
          ))}
        </div>

      </DndProvider>
    
    </>
  );
};

export default KanbanViewContainer;