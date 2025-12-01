import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER as string;

// 5.2.5.3 Client library functions
export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

// 5.2.5.5 Assignment APIs
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
export const fetchAssignment = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}`);
  return response.data;
};
export const updateTitle = async (title: string) => {
  const response = await axios.get(
    `${ASSIGNMENT_API}/title/${encodeURIComponent(title)}`
  );
  return response.data;
};

// 5.2.5.6 Todos (arrays) APIs
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;
export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};
export interface TodoDto {
  id?: number;
  title?: string;
  completed?: boolean;
  description?: string;
  editing?: boolean;
}
export const removeTodo = async (todo: { id: number }) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data as TodoDto[];
};
export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};
export const postNewTodo = async (todo: TodoDto) => {
  const response = await axios.post(`${TODOS_API}`, todo);
  return response.data as TodoDto;
};
export const deleteTodo = async (todo: { id: number }) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data as TodoDto[];
};
export const updateTodo = async (todo: TodoDto & { id: number }) => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data as TodoDto;
};
