import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {

  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    options.headers = options.headers || {};

    options.headers.Authorization = `Bearer ${token}`;
  }
  fetch(url, options)
    .then(response => {
      Promise.resolve(response);
      console.log(response)
      if (response.ok) return response.json();
    })
    .catch(error => console.error('Bad Request'))
}