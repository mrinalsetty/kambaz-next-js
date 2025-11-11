"use client";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem
      key={todo.id}
      className="d-flex align-items-center justify-content-between"
    >
      <span className="fw-semibold fs-4 me-auto">{todo.title}</span>

      <div className="d-flex align-items-center">
        <Button
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          className="btn btn-primary me-2 px-3"
        >
          Edit
        </Button>
        <Button
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          className="btn btn-danger px-3"
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}
