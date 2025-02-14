import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import KanbanSection from './KanbanViewSection';
import { getBoardData } from '../../services/apiService';

function KanbanViewContainer () {
  const [boardData, setBoardData] = useState({});

  useEffect(()=>{
    getBoardData().then(data => setBoardData(data))
  },[])

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
          {boardData.sections && Object.keys(boardData.sections).map((section)=>(
            <KanbanSection section={section} taskIds={boardData.sections[section]} tasks={boardData.tasks} key={section} updateBoard={updateBoard} />
          ))}
        </div>
        {/* <div>{JSON.stringify(boardData)}</div> */}

      </DndProvider>
    
    </>
  );
};

export default KanbanViewContainer;