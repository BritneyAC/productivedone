import useWindowsSettings from '@/hooks/useWindowsSettings';
import styles from '@/styles/css/WindowHoC.module.css'
import { useEffect, useRef, useState } from 'react'

interface WindowHoCProps {
  title: string;
  children: React.ReactNode;
  id: number;
  handleClose: () => void;
  handleClick: (id: number) => void;
  width: number;
  height: number;
  posX: number;
  posY: number;
  recent: number;
}


export default function WindowHoC(props: WindowHoCProps) {
  const [width, setWidth] = useState(30)
  const [height, setHeight] = useState(25)
  const [posX, setPosX] = useState(props.posX)
  const [posY, setPosY] = useState(props.posY)
  const [mouseX, setMouseX] = useState(posX)
  const [mouseY, setMouseY] = useState(posY)
  const [isSettingsShown, setIsSettingsShown] = useState(false)
  const main = useRef(document.querySelector("main"))
  const [event, setEvent] = useState<PointerEvent>()

  const { recent, resetRecent } = useWindowsSettings()

  const toggleSettings = () => {
    setIsSettingsShown(prevIsSettingsShown => !prevIsSettingsShown);
  }

  const handlePointerDownMove = (e: any) => {
    setMouseX(e.clientX)
    setMouseY(e.clientY)
    setEvent(e)
    resetRecent()
    if(main.current !== null) {
      main.current.addEventListener("pointermove", handleAppDrag) 
      main.current.addEventListener("pointerup", (e)=>{
        if(main.current !== null && e.pointerId === 0) {
          main.current.removeEventListener("pointermove", handleAppDrag)
      }
    })}
  }
  
  const handlePointerDownResize = (e: any) => {
    setMouseX(e.clientX)
    setMouseY(e.clientY)
    setEvent(e)
    resetRecent()
    if(main.current !== null) {
      main.current.addEventListener("pointermove", handleAppResize) 
      main.current.addEventListener("pointerup", (e)=>{
        if(main.current !== null && e.pointerId === 0) {
          main.current.removeEventListener("pointermove", handleAppResize)
        }
      }) 
    }
  }


  const handleAppDrag = (e: any) => {
    let x = Number(((e.clientX / window.innerWidth) * 100).toFixed(2))
    let y = Number(((e.clientY / window.innerHeight) * 100).toFixed(2))
    if(x >= 100 - width) {
      x = 100 - width
    } else if(x <= 0) {
      x = 0
    }
    if(y >= 100 - height) {
      y = 100 - height
    } else if(y <= 0) {
      y = 0
    }
    setPosX(x)
    setPosY(y)
  }
  
  const handleAppResize = (e: any) => {
    let w =  Number(((e.clientX / window.innerWidth) * 100).toFixed(2)) - posX
    let h = Number(((e.clientY / window.innerHeight) * 100).toFixed(2)) - posY 
    if(w >= 100 - posX) {
      w = 100 - posX
    } else if(w <= 30) {
      w = 30
    }
    if(h >= 100 - posY) {
      h = 100 - posY
    } else if(h <= 25) {
      h = 25
    }
    setWidth(w)
    setHeight(h)
  }

  return (
    <div 
      className={styles.app} 
      style={
        {
          transform: `translateX(${posX}vw) translateY(${posY}vh)`,
          height:`${height}vh`, 
          width: `${width}vw`, 
          zIndex: `${9010 - props.recent}`}}
      id={props.id.toString()}
      key={props.id}
      onClick={()=>props.handleClick(props.id - 1)}
    >
      <div className={`${styles.bar} bar`}>
        <div className={styles.title} onPointerDown={(e) => handlePointerDownMove(e)}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.btns} >
          <div aria-label="Minimize" className={styles.minimize}/>
          <div aria-label="Settings" className={styles.settings}>
            <div className={styles.settingsInrCrcl}/>
            <div className={styles.settingsOtrCrcl}/>
            <div />
            <div />
            <div />
            <div />
          </div>
          <div aria-label="Close" className={styles.close} onClick={props.handleClose} />
        </div>
      </div>
      {props.children}

      <div className={styles.resize} onPointerDown={()=>handlePointerDownResize(props.id - 1)} >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}