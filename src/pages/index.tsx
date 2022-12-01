import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/css/Home.module.css'
import Todo from '@/components/Todo'
import Notes from '@/components/Notes'
import Chat from '@/components/Chat'
import WindowHoC from '@/components/WindowHoC'
import { useState } from 'react'



export default function Home() {

  const [runningApps, setRunningApps] = useState<JSX.Element[]>([]);
  const [idIncrement, setIdIncrement] = useState(0)
  const [isChatRunning, setIsChatRunning] = useState(false)
  const [app0, setApp0] = useState(0)
  const [app1, setApp1] = useState(0)
  const [app2, setApp2] = useState(0)
  const [app3, setApp3] = useState(0)
  const [app4, setApp4] = useState(0)
  const [app5, setApp5] = useState(0)
  const [app6, setApp6] = useState(0)
  const [app7, setApp7] = useState(0)
  const getRecent = [
    app0,
    app1,
    app2,
    app3,
    app4,
    app5,
    app6,
    app7,
  ]
  const setRecent = [
    setApp0,
    setApp1,
    setApp2,
    setApp3,
    setApp4,
    setApp5,
    setApp6,
    setApp7,
  ]
  
  const AppsElement = runningApps.map((todo, index) => todo)
  
  
  const handleAppClose = (id: number) => {
    setRunningApps(prevList => prevList.filter(task => {
      if(task !== null && task.props.id === id){
        if (task.props.title === "Chat") {
          setIsChatRunning(false)
        }
        return false
      }
      return true
    }))
  }

  const handleClick = (id:number) => {
    if(id - 1 >= 0 && !isNaN(id)){
      setRecent[id - 1](0)
      setRecent.forEach(app => app(prevCount => prevCount + 1))
    }
  }
  
  const TodoApp = () => {
    const id = idIncrement + 1
    setIdIncrement(id)
    setRecent.filter(app => app).forEach(app => app(prevCount => prevCount + 1))
    return (
      <WindowHoC title="Todo" recent={getRecent[id - 1]} id={id} handleClick={handleClick} handleClose={() => handleAppClose(id)} posX={runningApps.length * 10} posY={runningApps.length * 10} width={25} height={25}>
        <Todo />
      </WindowHoC>
    )
  }

  const NotesApp = () => {
    const id = idIncrement + 1
    setIdIncrement(id)
    return (
      <WindowHoC title="Notes" recent={getRecent[id - 1]} id={id} handleClick={handleClick} handleClose={() => handleAppClose(id)} posX={runningApps.length * 10} posY={runningApps.length * 10} width={25} height={25}>
        <Notes />
      </WindowHoC>
    )
  }

  const ChatApp = () => {
    const id = idIncrement + 1
    setIdIncrement(id)
    setIsChatRunning(true)
    return (
      <WindowHoC title="Chat" recent={getRecent[id - 1]} id={id} handleClick={handleClick} handleClose={() => handleAppClose(id)} posX={runningApps.length * 10} posY={runningApps.length * 10} width={25} height={25}>
        <Chat />
      </WindowHoC>
    )
  }

  const newTodoList = () => {
    setRunningApps(prevLists => [...prevLists, TodoApp()])
  }

  const newNotesApp = () => {
    setRunningApps(prevLists => [...prevLists, NotesApp()])
  }

  const newChatApp = () => {
    if(!isChatRunning){
      setRunningApps(prevLists => [...prevLists, ChatApp()])
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ProductiveDone</title>
        <meta name="description" content="Productive done is a productivity app focused on ease of use" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {runningApps}
        {runningApps.length < 9 && <div className={styles.newTodoList} onClick={newTodoList} />}
        {runningApps.length < 9 && <div className={styles.newNotesApp} onClick={newNotesApp} />}
        {!isChatRunning && <div className={styles.newChatApp} onClick={newChatApp} />}
      </main>
    </div>
  )
}
