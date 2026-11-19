// Garde l'utilisateur connecté dans le navigateur (reste connecté après un rechargement)
const KEY = 'dashr-user';

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(KEY);
}
