import { useState, useEffect } from 'react'
import ListViewContainer from './components/boards/list/ListViewContainer'
import KanbanViewContainer from './components/boards/kanban/KanbanViewContainer'
import { getSections, getTasks, updateTask } from './services/apiService'
import Header from './components/Header'

// Sleep utility function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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
        const tasks = await getTasks()
        await sleep(1000)
        setTasks(tasks)
        const sectionsData = await initializeSectionsData(tasks)
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

  const initializeSectionsData = async (tasks) => {
    // get the list of sections
    const sections = await getSections()
    // create empty sectionsData object
    // each section will be a key that points to an array of associated taskIds
    let sectionsData = {}
    // iterate through the sections list
    sections.forEach((section) => {
      // given the section, find tasks that have the same status, and return only the task ids
      let filteredTasks = tasks
        .filter((task) => task.status == section.section)
        .map((task) => task.id)
      sectionsData[section.section] = filteredTasks
    })
    return sectionsData
  }

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

  const handleToggle = () => {
    setIsKanbanView((prevState) => !prevState)
  }

  return (
    <>
      {isLoading && (
        <div className="flex h-screen items-center justify-center">
          <div className="h-24 w-24 animate-spin rounded-full border-4 border-[#94603F]  border-t-transparent"></div>
        </div>
      )}
      {error && (
        <div className="mx-auto w-full max-w-sm p-4">
          <p className="text-red-600">Error fetching tasks or sections.</p>
        </div>
      )}
      {!isLoading && !error && (
        <>
          <Header
            handleToggle={handleToggle}
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
