"use client";
import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  editing?: boolean;
}

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load todos from server
  const fetchTodos = async () => {
    try {
      const data = (await client.fetchTodos()) as Todo[];
      setTodos(data);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(
        `Failed to load todos: ${err instanceof Error ? err.message : ""}`
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Helper to extract backend error message
  const extractMessage = (err: unknown): string => {
    if (
      typeof err === "object" &&
      err !== null &&
      "response" in err &&
      (err as { response?: { data?: { message?: string } } }).response?.data
        ?.message
    ) {
      return (err as { response: { data: { message: string } } }).response.data
        .message;
    }
    return "Operation failed";
  };

  // Old DELETE (GET) -> removeTodo
  const removeTodo = async (todo: Todo) => {
    try {
      const updated = (await client.removeTodo(todo)) as Todo[];
      setTodos(updated);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(extractMessage(err));
    }
  };

  // New DELETE (DELETE method) -> deleteTodo
  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id)); // only remove if backend succeeds
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(extractMessage(err));
    }
  };

  // createNewTodo (GET /create)
  const createNewTodo = async () => {
    try {
      const updated = (await client.createNewTodo()) as Todo[];
      setTodos(updated);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(extractMessage(err));
    }
  };

  // postNewTodo (POST new todo)
  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      if (typeof newTodo.id === "number") {
        // Cast to Todo type
        setTodos([
          ...todos,
          {
            id: newTodo.id,
            title: newTodo.title ?? "",
            completed: !!newTodo.completed,
            description: newTodo.description,
          },
        ]);
        setErrorMessage(null);
      } else {
        setErrorMessage("Failed to add todo: missing ID");
      }
    } catch (err) {
      setErrorMessage(extractMessage(err));
    }
  };

  // Enable title editing
  const editTodo = (todo: Todo) => {
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...todo, editing: true } : t))
    );
  };

  // Update todo (PUT)
  const updateTodo = async (todo: Todo) => {
    try {
      await client.updateTodo(todo); // backend updates
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t))); // UI updates
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(extractMessage(err));
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {/* Error alert */}
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            {/* Remove using GET /delete */}
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />

            {/* Delete using DELETE method */}
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />

            {/* Edit title */}
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
            />

            {/* Completed checkbox */}
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              className="form-check-input me-2 float-start"
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {/* Title or input field */}
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
