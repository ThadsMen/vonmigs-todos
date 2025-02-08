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
      < Header />
      <button className="bg-[#646669] rounded-lg px-5" onClick={handleToggle}>{isKanbanView ? "List View": "Kanban View"}</button>
      {isKanbanView ? <KanbanViewContainer /> : <ListViewContainer />}
    </>
  )
}

export default App
