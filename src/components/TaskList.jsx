import React from 'react';
import moment from 'moment';

function formatDate(dateString) {
    const date = moment(dateString).startOf('day').toDate();
    // const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short', // abbreviated month name, e.g. Mar
        day: '2-digit'  // two digit day, e.g. 02
    });
}

function TaskList({tasks, handleTaskChecked}) {
    return(
        <div className="taskList">
            {tasks.map((task, index) => (
// TODO: change key to id from firebase
                    <div key={index} className="taskItem">
                        <input className="form-check-input taskListInput" type="checkbox" value="" id={`flexCheckDefault${index}`} onChange={() => handleTaskChecked(task.id)}></input>
                        <label className="form-check-label taskListLabel" htmlFor={`flexCheckDefault${index}`}>
                            <span className="taskName">{task.name}</span> 
                            <span className="taskDescription">{task.description}</span>
                            <span className="taskDate">{task.due? formatDate(task.due) : ''}</span>
                        </label>
                    </div>
                ))}
        </div>
    );
}

export default TaskList;