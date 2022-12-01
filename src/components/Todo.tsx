import styles from '@/styles/css/Todo.module.css'
import { useState } from 'react'
import Task from './Task'

class task {
  id: number
  name: string
  completed: boolean
  constructor(id: number, name: string, completed: boolean = false) {
    this.id = id
    this.name = name
    this.completed = completed
  }
}

export default function Todo() {
  const [todo, setTodo] = useState<task[]>([])
  const [input, setInput] = useState('')
  const [idIncrement, setIdIncrement] = useState(0)

  const addTodo = (e: any) => {
    e.preventDefault()
    setTodo(prevTodo => [...prevTodo, new task(idIncrement, input, false)])
    setIdIncrement(prevIncrement => prevIncrement + 1)
    setInput('')
  }

  const deleteTodo = (id: number) => {
    setTodo(prevTodo => prevTodo.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodo(prevTodo =>
      prevTodo.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const listOfTodos = todo.map((todo, index) => {
    return (
      <Task key={todo.id + 94011} id={todo.id} name={todo.name} deleteTodo={deleteTodo}/>
    )
  })
  return (
    <div className={styles.todo}>
      <div className={styles.list}>
        {listOfTodos}
      </div>
      <form>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit" onClick={(e) => addTodo(e)}>Add</button>
      </form>
    </div>
  )
}