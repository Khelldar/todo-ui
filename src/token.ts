const TOKEN_KEY = '@todo/x-token';

//TODO - get rid of all of this and use cookies
let token: string | null = null;

export function setToken(t: string) {
  token = t;
  localStorage.setItem(TOKEN_KEY, t);
}

export function getToken() {
  if (!token) {
    token = localStorage.getItem(TOKEN_KEY);
  }

  return token;
}

export function removeTokenFromStorage() {
  localStorage.removeItem(TOKEN_KEY);
  token = null;
}
