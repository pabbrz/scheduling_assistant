import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>Scheduling Assistant</h1>

        <div>
            <h2>Tasks</h2>
            <ul id="tasks"></ul>
        </div>

        <div>
            <h2>Add Task</h2>
            <label for="taskName">Task Name:</label>
            <input type="text" id="taskName" required></input>
            <br></br>
            <label for="taskTime">Task Time:</label>
            <input type="time" id="taskTime" required></input>
            <br></br>
            <button onclick="addTask()">Add Task</button>
        </div>
    </>
  )
}

export default App
