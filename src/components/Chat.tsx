import { useState } from "react"
import styles from "@/styles/css/Chat.module.css"

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [idIncrement, setIdIncrement] = useState(0)

  const addMessage = (e: any) => {
    e.preventDefault()
    setMessages(prevMessages => [...prevMessages, input])
    setIdIncrement(prevIncrement => prevIncrement + 1)
    setInput('')
  }

  const deleteMessages = (id: number) => {
    setMessages(prevMessages => {
      prevMessages.splice(id + 1, 1)
      return prevMessages
    })
  }


  const listOfMessages = messages.map((message, index) => {
    return (
      <div key={index} className={styles.task}>
        <p>{message}</p>
      </div>
    )
  })
  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {listOfMessages}
      </div>
      <form>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit" onClick={e => addMessage(e)}>Send</button>
      </form>
    </div>
  )
}