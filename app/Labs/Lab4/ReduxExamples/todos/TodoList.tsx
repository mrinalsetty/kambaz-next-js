"use client";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { RootState } from "../../store";
type Todo = { id: string; title: string };

export default function TodoList() {
  const todos = useSelector<RootState, Todo[]>(
    (state) => state.todosReducer.todos
  );

  return (
    <div id="wd-todo-list-redux">
      <h2 className="mb-3">Todo List</h2>
      <ListGroup className="rounded-3 shadow-sm">
        <TodoForm />
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
    </div>
  );
}
