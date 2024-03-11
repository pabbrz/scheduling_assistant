import '../stylesheets/OverviewPage.css'
import CreateTask from '../tasks/create/page';
import Badge from 'react-bootstrap/Badge'

{/* Calendar */}
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import 'path/to/superhero/bootstrap.min.css';


{/* Image imports */}
import task from "../assets/task.png"
import school from "../assets/school.png"
import grades from "../assets/grades.png"
import teachers from "../assets/teachers.png"
import notes from "../assets/notes.png"
import preferences from "../assets/preferences.png"
import logout from "../assets/logout.png"
import bell from "../assets/bell.svg"
import mail from "../assets/mail.svg"
import message from "../assets/message.svg"
import taskItem from "../assets/taskItem.svg"

{/* Add task */}
// import { useState } from 'react'
// import TaskForm from '../components/TaskForm'
// const [tasks, setTasks] = useState([]);
// const addTask = (task) => {
// setTasks([...tasks, task]);
// };



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
                    
                    {/* Middle Header */}
                    <div className="middleHeader">
                        <div className="leftMiddleHeader">
                            <h2 className="title">Overview</h2>
                        </div>
                        <div className="rightMiddleHeader">
                            <input className="form-control" type="text"></input>
                            <div className="iconWithBadge">
                                <button className="iconButton"><img className="iconImg" src={bell} /></button>
                                {/* <Badge className="myBadge" style={{ fontSize: ".50rem", marginLeft: "10px" }}>1</Badge> */}
                            </div>
                            <div className="iconWithBadge">
                                <button className="iconButton"><img className="iconImg" src={mail} /></button>
                            </div>
                            <div className="iconWithBadge">
                                <button className="iconButton"><img className="iconImg" src={message} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Middle Main */}
                    <div className="middleMain">
                        <div className="scrollableContent">
                            <div className="calendar">
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    weekends={true}
                                    themeSystem="bootstrap"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="rightSidebar">
                    {/* Spacer */}
                    <div className="spacer">

                    </div>
                    {/* Add task */}
                    <div className="rightSidebarTop">
                        <h5>Add Task</h5>
                        <CreateTask />
                        {/* <TaskForm addTask={addTask} />
                        <ul>
                            {tasks.map((task, index) => (
                            <li key={index}>{`${task.taskName} - Due by: ${task.dueDate}`}</li>
                            ))}
                        </ul> */}
                    </div>
                    {/* Urgent Tasks */}
                    <div className="rightSidebarMiddle">
                        <h5>Urgent Tasks<Badge style={{ fontSize: ".75rem", marginLeft: "10px" }}>1</Badge></h5>
                        
                        <button className="iconButton"><img className="iconImg" src={taskItem} /></button>
                        <button className="iconButton"><img className="iconImg" src={taskItem} /></button>
                        <button className="iconButton"><img className="iconImg" src={taskItem} /></button>
                    </div>
                    <div className="rightSidebarBottom">
                        <h5>Notifications<Badge style={{ fontSize: ".75rem", marginLeft: "10px" }}>1</Badge></h5>
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}

export default OverviewPage;