/* eslint-disable react/prop-types */
import { useState } from 'react'
import { CgAddR } from 'react-icons/cg'
import { HiOutlineViewBoards } from 'react-icons/hi'
import { VscAccount, VscBellDot, VscComment } from 'react-icons/vsc'
import { IconContext } from 'react-icons'
import TaskForm from './TaskForm'
import SectionForm from './SectionForm'

function Header(props) {
  const { handleBoardViewToggle, isKanbanView, setTasks, setSectionsData } =
    props

  const [isTaskForm, setIsTaskForm] = useState(false)
  const [isSectionForm, setIsSectionForm] = useState(false)

  const openTaskForm = () => setIsTaskForm(true)
  const closeTaskForm = () => setIsTaskForm(false)

  const openSectionForm = () => setIsSectionForm(true)
  const closeSectionForm = () => setIsSectionForm(false)

  return (
    <>
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-evenly items-center gap-5">
          <img src="src/assets/logo.png" alt="Von Logo" width="100px" />
          <IconContext.Provider value={{ size: '25px' }}>
            <button>
              <VscAccount />
            </button>
          </IconContext.Provider>
          <IconContext.Provider value={{ size: '25px' }}>
            <button>
              <VscBellDot />
            </button>
          </IconContext.Provider>
          <IconContext.Provider value={{ size: '25px' }}>
            <button>
              <VscComment />
            </button>
          </IconContext.Provider>
          <button
            className="bg-[#646669] rounded-lg px-5"
            onClick={handleBoardViewToggle}
          >
            {isKanbanView ? 'List View' : 'Kanban View'}
          </button>
        </div>
        <div>
          {isKanbanView && (
            <IconContext.Provider value={{ size: '50px' }}>
              <button onClick={openSectionForm}>
                <HiOutlineViewBoards />
              </button>
            </IconContext.Provider>
          )}
          <IconContext.Provider value={{ size: '50px' }}>
            <button onClick={openTaskForm}>
              <CgAddR />
            </button>
          </IconContext.Provider>
        </div>
      </div>
      {isTaskForm && (
        <TaskForm
          closeForm={closeTaskForm}
          isOpen={isTaskForm}
          setTasks={setTasks}
          setSectionsData={setSectionsData}
        />
      )}
      {isSectionForm && (
        <SectionForm
          isOpen={isSectionForm}
          closeForm={closeSectionForm}
          setSectionsData={setSectionsData}
        />
      )}
    </>
  )
}

export default Header
