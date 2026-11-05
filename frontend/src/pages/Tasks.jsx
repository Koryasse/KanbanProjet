import { useState } from "react";

// Colonnes du kanban (dans l'ordre)
const COLUMNS = {
  todo: "To do",
  doing: "In progress",
  done: "Done",
};

const STATUS_ORDER = Object.keys(COLUMNS);

// Données d'exemple (à remplacer par l'appel au backend PHP)
const SAMPLE_TASKS = [
  { id: 1, title: "Créer la base de données", status: "done" },
  { id: 2, title: "Faire l'API PHP des tâches", status: "doing" },
  { id: 3, title: "Relier la page Tasks au backend", status: "todo" },
  { id: 4, title: "Ajouter les paramètres utilisateur", status: "todo" },
];

function Tasks() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [newTitle, setNewTitle] = useState("");

  // Ajoute une tâche dans la colonne "À faire"
  function addTask(e) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    setTasks([...tasks, { id: Date.now(), title, status: "todo" }]);
    setNewTitle("");
  }

  // Déplace une tâche vers la colonne précédente (-1) ou suivante (+1)
  function moveTask(id, direction) {
    setTasks(tasks.map((task) => {
      if (task.id !== id) return task;
      const index = STATUS_ORDER.indexOf(task.status) + direction;
      return { ...task, status: STATUS_ORDER[index] };
    }));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="dashboard-main">
      <div className="tasks-content">
        <form className="tasks-form" onSubmit={addTask}>
          <input type="text" placeholder="New task..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button className="btn" type="submit">Add new task</button>
        </form>

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
                      <button disabled={colIndex === 0} onClick={() => moveTask(task.id, -1)}>←</button>
                      <button disabled={colIndex === STATUS_ORDER.length - 1} onClick={() => moveTask(task.id, 1)}>→</button>
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
