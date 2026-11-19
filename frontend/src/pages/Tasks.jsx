import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask as apiDeleteTask } from "../services/api";

// Colonnes du kanban (dans l'ordre)
const COLUMNS = {
  todo: "To do",
  doing: "In progress",
  done: "Done",
};

const STATUS_ORDER = Object.keys(COLUMNS);

function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charge les tâches de l'utilisateur depuis le backend
  useEffect(() => {
    if (!user) return;

    getTasks(user.user_id)
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  // Ajoute une tâche dans la colonne "To do"
  async function addTask(e) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    try {
      const task = await createTask(user.user_id, title);
      setTasks((prev) => [...prev, task]);
      setNewTitle("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Déplace une tâche vers la colonne précédente (-1) ou suivante (+1)
  async function moveTask(task, direction) {
    const status = STATUS_ORDER[STATUS_ORDER.indexOf(task.status) + direction];

    try {
      const updated = await updateTask(task.id, { status });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      await apiDeleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Les tâches sont liées à un compte : il faut être connecté
  if (!user) {
    return (
      <main className="dashboard-main">
        <div className="tasks-content">
          <p>Log in to see your tasks.</p>
          <Link to="/login" className="btn">Sign in</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-main">
      <div className="tasks-content">
        <form className="tasks-form" onSubmit={addTask}>
          <input type="text" placeholder="New task..." maxLength={100} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button className="btn" type="submit">Add new task</button>
        </form>

        {error && <p className="tasks-error">{error}</p>}
        {loading && <p>Loading...</p>}

        <div className="tasks-board">
          {STATUS_ORDER.map((status, colIndex) => {
            const columnTasks = tasks.filter((task) => task.status === status);

            return (
              <div key={status} className="tasks-column">
                <h2>{COLUMNS[status]} <span>{columnTasks.length}</span></h2>

                {columnTasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <p className={status === "done" ? "task-done" : ""}>{task.title}</p>

                    <div className="task-actions">
                      <button disabled={colIndex === 0} onClick={() => moveTask(task, -1)}>←</button>
                      <button disabled={colIndex === STATUS_ORDER.length - 1} onClick={() => moveTask(task, 1)}>→</button>
                      <button onClick={() => deleteTask(task.id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Tasks;
