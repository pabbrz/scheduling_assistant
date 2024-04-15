import '../stylesheets/OverviewPage.css'
import CreateTask from '../components/CreateTask';
import Badge from 'react-bootstrap/Badge'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import TaskList from '../components/TaskList'
import avatar from "../assets/Nola.jpg";

{/* Calendar */}
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
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

// firebase
// import { getFirestore, collection, addDoc, doc, getDoc, getDocs, updateDoc, increment, firebase } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { useAuth } from '../AuthContext';
import { useUserData, fetchTasksByUserId, deleteTask } from '../firebaseServices';
import { useTasks } from '../TaskContext';

function OverviewPage() {
    
    const { currentUser } = useAuth();
    const userID = currentUser.uid;
    const [userData, error] = useUserData(userID);
    const [setTasks] = useTasks();
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedTasks, setDispayedTasks] = useState([]);
    const [filterOption, setFilterOption] = useState('');
    const [searchTerm, setSearchTerms] = useState("");

    
    //gets task by user ID
    useEffect(() => {
        fetchTasksByUserId(userID)
        .then((tasks) => setTasks(tasks))
        .catch((error) => console.log('Error fetching tasks:', error));
    }, [userID, setTasks]);


    console.log('userID: ', userID);

    const tasks = useTasks();


    // // get tasks by userID
    // const [tasks, setTasks] = useState([]);
    // useEffect(() => {
    //     if (userData) {
    //         console.log('User fname:', userData.fname);
    //         fetchTasksByUserId(userID).then((tasks) => {
    //             console.log('tasks:', tasks);
    //             setTasks(tasks);
    //         });
    //     } else if (error) {
    //         console.log('Error fetching user data:', error);
    //     }
    // }, [userData, error]);


    let navigate = useNavigate();

    // handles logging out
    const { logOut } = useAuth();
    function handleLogOut() {
        console.log("logging out");
        logOut().then(() => {
            console.log("logged out");
            navigate('/');
        }).catch((error) => {
            console.log("error logging out: ", error);
        });
    }


    // tasks for displaying in middle of page
    // const [tasks, setTasks] = useState([{name: "task1", description: "description1", priority: "low", dueDate: "dueDate1"}, {name: "task2", description: "description2", priority: "medium", dueDate: "dueDate2"}, {name: "task3", description: "description3", priority: "high", dueDate: "dueDate3"}]);
    const handleTaskChecked = (taskID) => {
        console.log("task checked: ", taskID);
        //TODO remove task from urgentTasks, update firebase, and update state.
        deleteTask(taskID);
    }


    //search task by description
    const handleSearch = () => {
        const filteredTasks = tasks.filter((task) =>
            task.name.toLowerCase().includes(searchQuery.toLowerCase()),
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setDispayedTasks(filteredTasks);
    }

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
        if(event.target.value === 'dueDate') {
            handleFilterByDueDate();
        } else if (event.target.value === 'priority') {
            handleFilterByPriority();
        }
    }

    const handleFilterByDueDate = () => {
        const sortedByDueDate = [...displayedTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        setDispayedTasks(sortedByDueDate);
    }

    const handleFilterByPriority = () => {
        const sortedByPriority = [...displayedTasks].sort((a, b) => a.priority.localeCompare(b.priority));
        setDispayedTasks(sortedByPriority);
    }




    // const displayTasks = searchQuery ? filteredTasks : tasks;




    // code for dynamically changing the middle portion of the page based on menu selection
    const [menuSelection, setMenuSelection] = useState('calendar');
    const handleMenuSelection = (value) => {
        setMenuSelection(value);
    }
    const menuMap = {
        'taskList': <TaskList tasks={tasks} handleTaskChecked={handleTaskChecked} />,
        'calendar': <div className="calendar">
                        <FullCalendar
                            plugins={[dayGridPlugin, bootstrap5Plugin]}
                            initialView="dayGridMonth"
                            weekends={true}
                            themeSystem="bootstrap5"
                            // contentHeight={"auto"}
                            aspectRatio={1.5}
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
                            <img src={avatar} className="rounded-circle" id="avatar" alt="Avatar" />   
                            {/* <div className="welcomePillPhoto"></div> */}
                            <p id="welcomePillTextArea"><span id="welcomePillText">Welcome</span><span>Joshua</span></p>
                        </span>
                    </div>
                    {/* menu list */}
                    <div className="btn-group-vertical">
                        <button type="button" className="btn btn-secondary menuButton" onClick={()=>handleMenuSelection("taskList")}><img src={task} className="smallIcon" />Task List</button>
                        <button type="button" className="btn btn-secondary menuButton" onClick={()=>handleMenuSelection("calendar")}><img src={calendar} className="smallIcon" />Calendar</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={grades} className="smallIcon" />Today?</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={teachers} className="smallIcon" />Completed?</button>
                        <button type="button" className="btn btn-secondary menuButton"><img src={notes} className="smallIcon" />Trash?</button>
                    </div>
                    {/* preferences & log out */}
                    <div className="btn-group-vertical align-bottom">
                        <Link to="/profile"><button type="button" className="btn btn-secondary menuButton"><img src={preferences} className="smallIcon" />Profile</button></Link>
{/* TODO: code to actually log out user */}
                        <button type="button" className="btn btn-secondary menuButton" onClick={()=>handleLogOut()}><img src={logout} className="smallIcon" />Log out</button>
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
                            <input className="form-control" type="text" placeholder="Search tasks by description" onChange={(event) => {setSearchTerm(e.target.value)}}></input>
                            <button onClick={()=>handleMenuSelection("taskList")}>Search</button>
                        <div>
                        {/* <div className="template_Container">
                            {
                                TaskList
                                    .filter((val) => {
                                        if(searchTerm == ""){
                                            return val;
                                        } else if(val.description.toLowerCase().includes(searchTerm.toLowerCase())){
                                            return val;
                                        }
                                    })
                                    .map((val) => {
                                        return(
                                            <div className="template" key={val.task.name}>
                                            <h3>{val.name}</h3>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div> */}
                            <label>
                            <select value={filterOption} onChange={handleFilterChange}>
                                <option value="">Select Filter</option>
                                <option value="dueDate">Due Date</option>
                                <option value="priority">Priority</option>
                            </select>
                            </label>
                        </div>    
                            <TaskList tasks={displayedTasks} handleTaskChecked={handleTaskChecked} />
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
                        <div className="form-check">
                            {urgentTasks.map((task, index) => (
                                <div key={index}>
                                    <input className="form-check-input" type="checkbox" value="" id={`flexCheckDefault${index}`} onChange={() => handleTaskChecked(index)}></input>
                                    <label className="form-check-label" htmlFor={`flexCheckDefault${index}`}>
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