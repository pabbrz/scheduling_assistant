
import '../stylesheets/LandingPage.css'
import peopleWorking from "../assets/peopleWorking.png"
import { Link } from "react-router-dom";

function LandingPage() {
  
    return (
      <div className="LandingPageContainer">
          <div className="leftContainer">
            <div className="centered-element">
              <img src={peopleWorking} width="500" height="500"></img>
              <h3>Scheduling Assisstant - </h3>
              <h3>Simplify Your Life</h3>
              <h8>All your tasks and preferences in one place</h8>
            </div>
          </div>
  
  
          <div className="rightContainer">
            <div className="centered-element">
              <div className="left-align">
                <h3>Log in</h3>
                <div>
                    <h4>Username</h4>
                    <input class="form-control" type="text"></input>
                    <h4>Password</h4>
                    <input class="form-control" type="password"></input>
                    <button type="button" class="btn btn-light">Log in</button>
                    <h8><a href="url">Forgot your password?</a></h8>
                    <div><h8><a href="url">Sign up!</a></h8></div>
                    <Link to="/overview" style={{ textDecoration: 'none' }}><p style={{ textDecorationLine: "none", color: "#000" }}>Temporary Link to Overview Page</p></Link>
                </div>
  
                <div>
                    
                </div>
              </div>
            </div>
          </div>
      </div>
    );
}

export default LandingPage;