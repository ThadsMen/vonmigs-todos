import { useState, useEffect } from 'react'
import ListViewContainer from './components/list/ListViewContainer'
import KanbanViewContainer from './components/kanban/KanbanViewContainer'
import LoadingCircle from './components/LoadingCircle'
import ErrorState from './components/ErrorState'
import { getSections, getTasks, updateTask } from './services/apiService'
import Header from './components/Header'
import { sleep } from './utils/sleep'
import { initializeSectionsData } from './utils/initializeSectionsData'

function App() {
  const [isKanbanView, setIsKanbanView] = useState(true)
  const [tasks, setTasks] = useState([])
  const [sectionsData, setSectionsData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tasks and sections data on initial render
  useEffect(() => {
    const setup = async () => {
      try {
        await sleep(1000)

        const tasks = await getTasks()
        setTasks(tasks)
        const sections = await getSections()

        const sectionsData = initializeSectionsData(tasks, sections)
        setSectionsData(sectionsData)
      } catch (error) {
        console.log('Error fetching tasks or sections:', error)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    setup()
  }, [])

  // updates task with new section and updates section data to maintain order
  const updateSectionsData = async (task, newStatus) => {
    if (task.status === newStatus) return // No change needed
    const updatedTask = { ...task, status: newStatus }
    await updateTask(updatedTask)
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === updatedTask.id)
      return exists
        ? prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        : [...prev, updatedTask]
    })

    setSectionsData((prev) => {
      // Remove from old section and add to new
      const fromSection = task.status
      const toSection = newStatus

      return {
        ...prev,
        [fromSection]: prev[fromSection].filter((id) => id !== task.id),
        [toSection]: [...prev[toSection], task.id],
      }
    })
  }

  const handleBoardViewToggle = () => {
    setIsKanbanView((prevState) => !prevState)
  }

  return (
    <>
      {isLoading && <LoadingCircle />}
      {error && <ErrorState />}
      {!isLoading && !error && (
        <>
          <Header
            handleBoardViewToggle={handleBoardViewToggle}
            isKanbanView={isKanbanView}
            setTasks={setTasks}
            setSectionsData={setSectionsData}
          />
          <div className="mx-24 my-10">
            {isKanbanView ? (
              <KanbanViewContainer
                tasks={tasks}
                sectionsData={sectionsData}
                setTasks={setTasks}
                setSectionsData={setSectionsData}
                updateSectionsData={updateSectionsData}
              />
            ) : (
              <ListViewContainer />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default App
