import styles from "@/styles/css/Notes.module.css"
import { ChangeEvent, useState } from "react"

export default function Notes() {
  const [input, setInput] = useState("")

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }
  return (
    <div className={styles.Notes}>
      <textarea value={input} onChange={(e)=>handleChange(e)} />
    </div>
  )
}