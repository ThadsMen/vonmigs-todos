import { CgAddR } from "react-icons/cg";
import { VscAccount, VscBellDot, VscComment } from "react-icons/vsc";
import { IconContext } from "react-icons";

function Header() {
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
          </div>
          <IconContext.Provider value = {{size: "50px"}}> 
            <button><CgAddR/></button>
          </IconContext.Provider>
        </div>
      </>
    )
};

export default Header;