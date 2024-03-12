import { useForm } from 'react-hook-form';
import { auth } from '../../firebaseConfig.js';
import app from '../../firebaseConfig.js';
import { addDoc, collection, getFirestore } from "firebase/firestore";


export default function CreateTask() {

    // get a reference to the firestore database
    let db;
    try {
      db = getFirestore(app);
      console.log('got firestore db reference');
    }
    catch (error) {
      console.error('Error getting firestore db reference: ', error);
    }

    // get user id from firebase auth object
    let userID;
    try {
      userID = auth.currentUser.uid;
      console.log('User ID: ', userID);
    }
    catch (error) {
      console.error('Error getting user ID: ', error);
    }

    // db.collection('users').doc(userID).collection('tasks').add(taskData);

    // function to add a task to a user's 'tasks' sub collection
    async function addTaskToUser(userID, taskData) {
        if (!userID) {
          console.error('User not logged in');
          return;
        }  
      
        try {
          await addDoc(collection(db, 'users', userID, 'tasks'), taskData);
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
          taskName: data.taskName,
          taskDescription: data.taskDescription,
          taskStatus: data.taskStatus,
          taskDueDate: data.taskDueDate
        };
        addTaskToUser(userID, taskData);
        reset(); // clear form after submit
      };
 

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label for="exampleInputTitle1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputTitle1"
              name="title"
              {...register("taskName", { required: "Task name is required" })}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleInputDescription1"
              rows={6}
              name="description"
              {...register("taskDescription")}
            ></textarea>
          </div>

          <div className="d-flex">
            <div className="mb-3 col-2 me-3">
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
            </div>

            <div className="mb-3 col-2 me-3">
              <label htmlFor="assigned_user" className="form-label">
               User
              </label>
              <select
                name="assigned_user"
                className="form-select form-select-sm"
                aria-label="Default select example"
              >
                <option>Select User</option>
              </select>
            </div>

            <div className="mb-3 col-3 me-3">
              <label htmlFor="deadline" className="form-label">
                Deadline
              </label>
              <input
                type="date"
                className="form-control"
                name="deadline"
                id="deadline"
                min={new Date().toISOString().split("T")[0]}
                {...register("taskDueDate")}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            Create New Task
          </button>
        </form>
      </div>
    );
}