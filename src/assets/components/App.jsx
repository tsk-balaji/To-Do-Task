import { useState } from "react";
import "./App.css";
export default App;

// This is a function based React JS for ToDo Applications
function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false); //New state for editing
  const [currentTask, setCurrentTask] = useState({}); //State to update the selected task
  const [filterStatus, setFilterStatus] = useState("All"); // New state for filtering

  //Used to console.log the tasks
  // useEffect(() => {
  //   console.log("Updated tasks:", tasks);
  // }, [tasks]);

  //Sets the tasks
  const addTodo = () => {
    const taskName = document.getElementById("taskName").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const newTask = {
      id: tasks.length,
      tasksName: taskName,
      tasksDesc: taskDesc,
      tasksStatus: "false",
    };
    setTasks([...tasks, newTask]);
    document.getElementById("taskName").value = ""; //Setting the input value to null again
    document.getElementById("taskDesc").value = ""; //Setting the input value to null again
  };

  //Sets the status of the task
  const taskCompleted = (e, id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            tasksStatus: e.target.value === "Completed" ? "true" : "false",
          }
        : task
    );
    setTasks(updatedTasks);
  };

  //Set the editing state to true and the task's name and description to respective input fields
  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    document.getElementById("taskName").value = task.tasksName;
    document.getElementById("taskDesc").value = task.tasksDesc;
  };

  //Updates the value of task's name and description
  const saveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id
        ? {
            ...task,
            tasksName: document.getElementById("taskName").value,
            tasksDesc: document.getElementById("taskDesc").value,
          }
        : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTask({});
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
  };

  //deletes tasks
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value); // Set the filter status based on dropdown selection
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "Completed") {
      return task.tasksStatus === "true";
    } else if (filterStatus === "Not-Completed") {
      return task.tasksStatus === "false";
    }
    return true; // For "All", return all tasks
  });

  return (
    <div>
      <h1 className="header">My todo</h1>

      <div className="d-flex toDoGroup">
        <div className="mb-3">
          <input
            type="text"
            className="taskName form-control"
            id="taskName"
            placeholder="To Do Name"
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="taskDesc form-control"
            id="taskDesc"
            placeholder="To Do Description"
            style={{ textAlign: "center" }}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={addTodo}>
          Add ToDo
        </button>
        {isEditing && (
          <button type="button" className="btn btn-primary" onClick={saveEdit}>
            Save Changes
          </button>
        )}
      </div>

      <div className="d-flex statusRow mb-4">
        <p className="mytodo me-auto">My Todos</p>
        <select
          className="statDrop btn btn-secondary"
          id="statDrop"
          value={filterStatus} // Set the value based on the filterStatus state
          onChange={handleFilterChange} // Handle change on filter selection
        >
          <option value="All">All</option>
          <option value="Not-Completed">Not-Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="allTasks">
        {filteredTasks.map((task) => (
          <div className="card col-3" key={task.id}>
            <div className="taskNameComp">Name: {task.tasksName}</div>
            <div className="taskDescComp">Description: {task.tasksDesc}</div>
            <div className="taskStatComp dropdown mb-2">
              <select
                className={
                  task.tasksStatus === "true"
                    ? "btn btn-success"
                    : "btn btn-danger"
                }
                onChange={(e) => taskCompleted(e, task.id)}
                id={task.id}
                value={
                  task.tasksStatus === "true" ? "Completed" : "Not-Completed"
                }
              >
                <option>Not-Completed</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="d-flex mb-3">
              <button
                type="button"
                className="btn updBtn btn-info btn-sm"
                onClick={() => handleEditClick(task)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn delBtn btn-danger btn-sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
