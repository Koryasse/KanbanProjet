// Adresse de l'API PHP (modifiable via VITE_API_URL dans frontend/.env)
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

// Envoie une requête JSON au backend et renvoie la réponse décodée
async function request(path, method = 'GET', body) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Impossible de joindre le serveur');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error ?? 'Une erreur est survenue');
  }
  return data;
}

// Utilisateurs
export const login = (email, password) => request('/login', 'POST', { email, password });
export const register = (name, email, password) => request('/register', 'POST', { name, email, password });

// Tâches
export const getTasks = (userId) => request(`/users/${userId}/tasks`);
export const createTask = (userId, title, status = 'todo') => request(`/users/${userId}/tasks`, 'POST', { title, status });
export const updateTask = (id, changes) => request(`/tasks/${id}`, 'PUT', changes);
export const deleteTask = (id) => request(`/tasks/${id}`, 'DELETE');
