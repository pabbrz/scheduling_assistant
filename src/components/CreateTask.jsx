import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';


import { db } from '../firebaseConfig.js';
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

import { useAuth } from '../AuthContext';
import { useUserData } from '../firebaseServices';


export default function CreateTask() {
    
    const { currentUser } = useAuth();
    const userID = currentUser.uid;
    const [userData, error] = useUserData(userID);

    console.log('userData: ', userData);

    useEffect(() => {
        if (userData) {
            console.log('User fname:', userData.fname);
        } else if (error) {
            console.log('Error fetching user data:', error);
        }
    }, [userData, error]);
    
    console.log('db:', db);

    // db.collection('users').doc(userID).collection('tasks').add(taskData);

    //function to add a task to a user's 'tasks' sub collection
    async function addTaskToUser(userID, taskData) {
        if (!userID) {
          console.error('User not logged in');
          return;
        }  
      
        try {
          //await addDoc(collection(db, 'users', userID, 'tasks'), taskData);
          await addDoc(collection(db, 'tasks'), taskData);
          console.log('Task added');
        }
        catch (error) {
          console.error('Error adding task: ', error);
        }  
    }
   
    // react useForm hook
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    // function to handle form submission
    const onSubmit = (data) => {
        const taskData = {
          name: data.name,
          description: data.description,
          priority: data.priority,
          due: data.due,
          userID: userID // user id of the logged in user
        };
        addTaskToUser(userID, taskData);
        reset(); // clear form after submit
      };
 

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              style={{ width:"75%" }}
              {...register("name", { required: "Task name is required" })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={6}
              name="description"
              style={{ width:"75%" }}
              {...register("description")}
            ></textarea>
          </div>

          <div className="d-flex">
            
            {/* don't think we need to select user or status ? */}
            {/* <div className="mb-3 col-2 me-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                name="status"
                className="form-select form-select-sm"
                aria-label="Default select example"
                {...register("taskStatus")}
              >
                <option>Select Status</option>
                <option value="not_started">Not started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div> */}

            <div className="mb-3 col-2 me-3">
              <label htmlFor="priority" className="form-label">
               Priority
              </label>
              <select
                name="prioriy"
                id="priority" 
                className="form-select form-select-sm"
                aria-label="Default select example"
                {...register("priority")}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="mb-3 col-3 me-3">
              <label htmlFor="dueDate" className="form-label">
                DueDate
              </label>
              <input
                type="date"
                className="form-control"
                name="dueDate"
                id="dueDate"
                min={new Date().toISOString().split("T")[0]}
                {...register("due")}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success" style={{ width:"75%" }}>
            Create New Task
          </button>
        </form>
      </div>
    );
}