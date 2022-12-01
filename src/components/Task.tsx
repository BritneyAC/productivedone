import styles from "@/styles/css/Task.module.css"
import { useState } from "react"

interface TaskProps {
  id: number;
  name: string;
  deleteTodo: (id: number) => void;
}

export default function Task(props: TaskProps) {
  const [completed, setCompleted] = useState(false)

  const toggleTodo = () => {
    setCompleted(prevStatus => !prevStatus)
  }
  return (
    <div key={props.id} className={styles.task}>
      <div className={completed ? styles.completed : styles.notCompleted} onClick={toggleTodo}/>
      <p>{props.name}</p>
      <div className={styles.delete} onClick={()=>props.deleteTodo(props.id)}/>
    </div>
  )
}