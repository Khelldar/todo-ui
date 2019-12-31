const TOKEN_KEY = '@todo/x-token';

//TODO - get rid of all of this and use cookies

export function setToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t);
}

export function getTokenFromStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeTokenFromStorage() {
  localStorage.removeItem(TOKEN_KEY);
}
