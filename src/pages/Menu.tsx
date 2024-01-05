import "./Menu.less";
import { useEffect, useRef, useState } from "react"
import { gameManager } from "../core/GameManager";

import { TbDoorEnter } from "react-icons/tb";

export function Menu() {
  const [login, setLogin] = useState(false);
  const [menu12, setMenu12] = useState(false);
  const [doorCreate, setDoorCreate] = useState(false);
  const [openDoor, setOpenDoor] = useState(false);

  useEffect(() => {
    gameManager.on("doorCreate", () => {
      setDoorCreate(true)
    }, true, true);
    gameManager.on("openDoor", () => {
      setOpenDoor(true)
      setMenu12(false)
    }, true, true);
    setTimeout(() => {
      setLogin(true);
      setMenu12(true)
    }, 500);
  }, [])

  return (
    <div className="menu-container">
      <div className="menu-12" style={{ opacity: menu12 ? "0.9" : "0" }}/>
      <div className="menu-login" style={{ opacity: login ? "1" : "0" }}>
        <div className="background" style={{alignContent:"center"}}>
          <TbDoorEnter className="ClickMe" onClick={login ? () => {
            gameManager.emit("button-start-click");
            gameManager.emit("start")
            setLogin(false)
          } : () => { }}/>
        </div>
      </div>
    </div>
  )
}
