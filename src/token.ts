const TOKEN_KEY = '@todo/x-token';

export let token = '';

export function setToken(t: string) {
  token = t;
  localStorage.setItem(TOKEN_KEY, t);
}

export function getTokenFromStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeTokenFromStorage() {
  localStorage.removeItem(TOKEN_KEY);
}
