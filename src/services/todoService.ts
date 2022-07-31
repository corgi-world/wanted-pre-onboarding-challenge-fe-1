import { get, post, put, _delete } from "./httpRequest";

const BASE_URL = "/todos";

interface ITodoResponse {
  isError: boolean;
  data?: ITodo[];
}
interface ITodoDeleteResponse {
  isError: boolean;
  data?: string;
}
export interface ITodo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export async function requestGetTodos(token: string): Promise<ITodoResponse> {
  const { isError, data } = await get(BASE_URL, token);
  return { isError, data: data.data };
}

export async function requestCreateTodo(
  token: string,
  title: string,
  content: string
): Promise<ITodoResponse> {
  const { isError, data } = await post(BASE_URL, { title, content }, token);
  return { isError, data: data.data };
}

export async function requestUpdateTodo(
  token: string,
  id: string,
  title: string,
  content: string
): Promise<ITodoResponse> {
  const { isError, data } = await put(`${BASE_URL}/${id}`, { title, content }, token);
  return { isError, data: data.data };
}

export async function requestDeleteTodo(
  token: string,
  id: string
): Promise<ITodoDeleteResponse> {
  const { isError, data } = await _delete(`${BASE_URL}/${id}`, token);
  return { isError, data: data.data };
}
