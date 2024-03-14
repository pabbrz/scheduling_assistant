import '../stylesheets/OverviewPage.css'
import CreateTask from '../components/CreateTask';
import Badge from 'react-bootstrap/Badge'
import { Link } from "react-router-dom";
import { useState } from 'react'
import TaskList from '../components/TaskList'

{/* Calendar */}
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import 'path/to/superhero/bootstrap.min.css';


{/* Image imports */}
import task from "../assets/task.png"
import calendar from "../assets/calendar.png"
import grades from "../assets/grades.png"
import teachers from "../assets/teachers.png"
import notes from "../assets/notes.png"
import preferences from "../assets/preferences.png"
import logout from "../assets/logout.png"
import bell from "../assets/bell.svg"
import mail from "../assets/mail.svg"
import message from "../assets/message.svg"
import taskItem from "../assets/taskItem.svg"


function OverviewPage() {
    
    // tasks for displaying in middle of page
    const [tasks, setTasks] = useState([{name: "task1", description: "description1", priority: "low", dueDate: "dueDate1"}, {name: "task2", description: "description2", priority: "medium", dueDate: "dueDate2"}, {name: "task3", description: "description3", priority: "high", dueDate: "dueDate3"}]);
    const handleTaskChecked = (index) => {
        console.log("task checked: ", index);
        //TODO remove task from urgentTasks, update firebase, and update state.
    }

    // code for dynamically changing the middle portion of the page based on menu selection
    const [menuSelection, setMenuSelection] = useState('calendar');
    const handleMenuSelection = (value) => {
        setMenuSelection(value);
    }
    const menuMap = {
        'taskList': <TaskList tasks={tasks} handleTaskChecked={handleTaskChecked} />,
        'calendar': <div className="calendar">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            weekends={true}
                            themeSystem="bootstrap"
                        />
                    </div>
    }

    // urgent tasks list
    const [urgentTasks, setUrgentTasks] = useState(["task1", "task2", "task3"]);
    const [urgentTasksCount, setUrgentTasksCount] = useState(urgentTasks.length);
    

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
                        <button type="button" className="btn btn-secondary menuButton" onClick={()=>handleMenuSelection("taskList")}><img src={task} className="smallIcon" />Task List</button>
                        <button type="button" className="btn btn-secondary menuButton" onClick={()=>handleMenuSelection("calendar")}><img src={calendar} className="smallIcon" />Calendar</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={grades} className="smallIcon" />Grades</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={teachers} className="smallIcon" />Teachers</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={notes} className="smallIcon" />Notes</button>
                    </div>
                    {/* preferences & log out */}
                    <div className="btn-group-vertical align-bottom">
                        <Link to="/profile"><button type="button" className="btn btn-secondary menuButton"><img src={preferences} className="smallIcon" />Profile</button></Link>
{/* TODO: code to actually log out user */}
                        <Link to="/"><button type="button" className="btn btn-secondary menuButton"><img src={logout} className="smallIcon" />Log out</button></Link>
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
                            {/* dynamically select what renders in middle based on menu */}
                            {menuMap[menuSelection]}
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
                        <h5>Urgent Tasks<Badge style={{ fontSize: ".75rem", marginLeft: "10px" }}>{urgentTasksCount}</Badge></h5>
                        <div class="form-check">
                            {urgentTasks.map((task, index) => (
                                <div key={index}>
                                    <input class="form-check-input" type="checkbox" value="" id={`flexCheckDefault${index}`} onChange={() => handleTaskChecked(index)}></input>
                                    <label class="form-check-label" for={`flexCheckDefault${index}`}>
                                        {task}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Notifications */}
                    <div className="rightSidebarBottom">
                        <h5>Notifications<Badge style={{ fontSize: ".75rem", marginLeft: "10px" }}>1</Badge></h5>
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}

export default OverviewPage;