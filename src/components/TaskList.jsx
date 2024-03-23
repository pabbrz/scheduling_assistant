import React from 'react';

function TaskList({tasks, handleTaskChecked}) {
    return(
        <div className="taskList">
            {tasks.map((task, index) => (
// TODO: change key to id from firebase
                    <div key={index}>
                        <input className="form-check-input taskListInput" type="checkbox" value="" id={`flexCheckDefault${index}`} onChange={() => handleTaskChecked(index)}></input>
                        <label className="form-check-label taskListLabel" htmlFor={`flexCheckDefault${index}`}>
                            {task.name} {task.description}
                        </label>
                    </div>
                ))}
        </div>
    );
}

export default TaskList;