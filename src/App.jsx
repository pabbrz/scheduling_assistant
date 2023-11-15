import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import peopleWorking from "./assets/peopleWorking.png"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="leftContainer">
          <div className="centered-element">
            <img src={peopleWorking} width="500" height="500"></img>
            <h1>Scheduling Assisstant - Simplify Your Life</h1>
            <h3>All your tasks and preferences in one place</h3>
          </div>
        </div>


        <div className="rightContainer">
          <div className="centered-element">
            <div className="left-align">
              <h1>Log in</h1>
              <div>
                  <h4>Username</h4>
                  <input class="form-control" type="text"></input>
                  <h4>Password</h4>
                  <input class="form-control" type="text"></input>
                  <button type="button" class="btn btn-light">Log in</button>
                  <h8>Forgot your password?</h8>
                  <div><h8>Sign up!</h8></div>
              </div>

              <div>
                  
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default App
