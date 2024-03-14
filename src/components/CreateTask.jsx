import { useForm } from 'react-hook-form';
import { auth } from '../firebaseConfig.js';
import app from '../firebaseConfig.js';
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
          name: data.name,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate
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
                {...register("dueDate")}
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