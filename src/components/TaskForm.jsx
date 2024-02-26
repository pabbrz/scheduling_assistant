import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    addTask({ taskName, dueDate });
    setTaskName('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label></label>
        <input
          type="text"
          placeholder="task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>
      <div>
        <label></label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
