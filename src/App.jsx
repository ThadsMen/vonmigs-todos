import { useState } from "react"
import Header from "./Header"
import ListViewContainer from "./boards/list/ListViewContainer"
import KanbanViewContainer from "./boards/kanban/KanbanViewContainer";

function App() {

  const [isKanbanView, setIsKanbanView ] = useState(true);

  const handleToggle = () => {
    setIsKanbanView(prevState => !prevState)
  }
  return (
    <>
      < Header handleToggle={handleToggle} isKanbanView={isKanbanView}/>
      
      {isKanbanView ? <KanbanViewContainer /> : <ListViewContainer />}
    </>
  )
}

export default App
