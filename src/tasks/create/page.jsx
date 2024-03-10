export default function CreateTask() {
    return (
      <div>
        <form>
          <div className="mb-3">
            <label for="exampleInputTitle1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputTitle1"
              name="title"
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
            ></textarea>
          </div>

          <div className="d-flex">
            <div className="mb-3 col-3 me-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                name="status"
                className="form-select"
                aria-label="Default select example"
              >
                <option>Select Status</option>
                <option value="not_started">Not started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mb-3 col-3 me-3">
              <label htmlFor="assigned_user" className="form-label">
                Assigned User
              </label>
              <select
                name="assigned_user"
                className="form-select"
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
              />
            </div>
          </div>

          <button type="submit" className="btn btn-Success">
            Create New Task
          </button>
        </form>
      </div>
    );
}