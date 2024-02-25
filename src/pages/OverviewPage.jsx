import '../stylesheets/OverviewPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

function OverviewPage() {
    return(
        <>
            <div className="overviewPageContainer">
                {/* Left Menu Sidebar */}
                <div className="leftSidebar">
                    <div className="welcomePillDiv">
                        <span class="badge badge-pill badge-secondar welcomePill">
                            <div className="welcomePillPhoto"></div>
                            <p><span id="welcomePillText">Welcome</span><span>Someone@my.unt.edu</span></p>
                           <Link to="/Notification" style={{textDecoration: 'none'}}><p style={{textDecoration: "none", color: "#000"}}>Temporary Link to notification page</p></Link>
                        </span>
                    </div>
                </div>

                {/* Middle Portion */}
                <div className="middle">
                    
                </div>

                {/* Right Sidebar */}
                <div className="rightSidebar">
                    
                </div>
            </div>
            
        </>
    )
}

export default OverviewPage;