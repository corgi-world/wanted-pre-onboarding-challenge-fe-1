const BASE_URL = "http://localhost:8080";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";
type typeMethod = typeof GET | typeof POST | typeof PUT | typeof DELETE;

async function _fetch(url: string, method: typeMethod, data = {}, token = "") {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: method !== GET ? JSON.stringify(data) : undefined,
  });

  const json = await response.json();

  return { isError: !response.ok, data: json };
}

export async function get(url: string, token: string) {
  return await _fetch(url, GET, {}, token);
}

export async function post(url: string, data = {}, token = "") {
  return await _fetch(url, POST, data, token);
}

export async function put(url: string, data = {}, token = "") {
  return await _fetch(url, PUT, data, token);
}

export async function _delete(url: string, token = "") {
  return await _fetch(url, DELETE, {}, token);
}
