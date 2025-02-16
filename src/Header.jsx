/* eslint-disable react/prop-types */
import { useState } from "react"
import { CgAddR } from "react-icons/cg";
import { VscAccount, VscBellDot, VscComment } from "react-icons/vsc";
import { IconContext } from "react-icons";
import TaskForm from "./TaskForm";

function Header(props) {

  const {handleToggle, isKanbanView} = props

  const [isOpen, setIsOpen] = useState(false)

  const openForm = () => setIsOpen(true)
  const closeForm = () => setIsOpen(false)
    return (
        <>
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row justify-evenly items-center gap-5">
              <img src="src/assets/logo.png" alt="Von Logo" width="100px"/>
              <IconContext.Provider value = {{size: "25px"}}> 
                <button>< VscAccount/></button>
              </IconContext.Provider>
              <IconContext.Provider value = {{size: "25px"}}> 
                <button>< VscBellDot/></button>
              </IconContext.Provider>
              <IconContext.Provider value = {{size: "25px"}}> 
                <button>< VscComment/></button>
              </IconContext.Provider>
              <button className="bg-[#646669] rounded-lg px-5" onClick={handleToggle}>{isKanbanView ? "List View": "Kanban View"}</button>
          </div>
          <IconContext.Provider value = {{size: "50px"}}> 
            <button onClick={openForm}><CgAddR/></button>
          </IconContext.Provider>
        </div>
        {isOpen && <TaskForm closeForm={closeForm} isOpen={isOpen} />}
      </>
    )
};

export default Header;