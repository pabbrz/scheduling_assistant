import '../stylesheets/OverviewPage.css'

{/* Image imports */}
import task from "../assets/task.png"
import school from "../assets/school.png"
import grades from "../assets/grades.png"
import teachers from "../assets/teachers.png"
import notes from "../assets/notes.png"
import preferences from "../assets/preferences.png"
import logout from "../assets/logout.png"

function OverviewPage() {
    return(
        <>
            <div className="overviewPageContainer">
                {/* Left Menu Sidebar */}
                <div className="leftSidebar">
                    {/* welcome pill */}
                    <div className="welcomePillDiv">
                        <span className="badge badge-pill badge-secondary welcomePill">
                            <div className="welcomePillPhoto"></div>
                            <p><span id="welcomePillText">Welcome</span><span>someone@my.unt.edu</span></p>
                        </span>
                    </div>
                    {/* menu list */}
                    <div className="btn-group-vertical">
                        <button type="button" className="btn btn-secondary menuButton"><img src={task} className="smallIcon" />Task Overview</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={school} className="smallIcon" />Classes</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={grades} className="smallIcon" />Grades</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={teachers} className="smallIcon" />Teachers</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={notes} className="smallIcon" />Notes</button>
                    </div>
                    {/* preferences & log out */}
                    <div className="btn-group-vertical align-bottom">
                        <button type="button" className="btn btn-secondary menuButton"><img src={preferences} className="smallIcon" />Preferences</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={logout} className="smallIcon" />Log out</button>
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