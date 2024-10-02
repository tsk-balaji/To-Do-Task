import { useState, useEffect } from "react";
import "./App.css";
export default App;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]);

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
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
  };

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

  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    document.getElementById("taskName").value = task.tasksName;
    document.getElementById("taskDesc").value = task.tasksDesc;
  };

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

  const deleteTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(tasks.id, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1 className="header">My todo</h1>

      <div className="d-flex toDoGroup">
        <div className="mb-3">
          <input
            type="text"
            className="taskName form-control"
            id="taskName"
            placeholder="To Do Name "
            style={{ textAlign: "center" }}
            // onChange={(e) => handleChange("Name", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="taskDesc form-control"
            id="taskDesc"
            placeholder="To Do Description"
            style={{ textAlign: "center" }}
            // onChange={(e) => handleChange("Description", e.target.value)}
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
        <p className="me-auto">My Todos</p>
        <select className="statDrop btn btn-secondary" id="statDrop">
          <option>All </option>
          <option>Not-Completed</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="allTasks">
        {tasks.map((task) => (
          <div className="card col-3" key={task.id}>
            <div className="taskNameComp">Name: {task.tasksName}</div>
            <div className="taskDescComp">Description: {task.tasksDesc}</div>
            <div className="taskStatComp dropdown mb-2">
              <select
                className={
                  task.tasksStatus === "true"
                    ? "btn btn-success"
                    : "btn btn-secondary"
                }
                onChange={(e) => taskCompleted(e, task.id)}
                id={task.id}
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
                onClick={deleteTask}
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
