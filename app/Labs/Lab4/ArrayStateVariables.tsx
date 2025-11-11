import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  // NEW: read todos from Redux
  const todos = useSelector<RootState, { id: string; title: string }[]>(
    (state) => state.todosReducer.todos
  );

  return (
    <div>
      <div
        id="wd-array-state-variables"
        className="card p-3 border rounded-3"
        style={{ maxWidth: 360 }}
      >
        <h2 className="h4 fw-bold mb-2">Array State Variable</h2>

        <button
          onClick={addElement}
          className="btn btn-success mb-3 rounded-3 px-3 d-inline-flex align-self-start"
          style={{ width: "auto" }}
        >
          Add Element
        </button>

        <ul className="list-group list-group-flush border rounded-3">
          {array.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center py-3"
            >
              <span className="fs-4">{item}</span>
              <button
                onClick={() => deleteElement(index)}
                className="btn btn-danger btn-sm px-3 rounded-3"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-3" />
      <ListGroup className="list-group-flush border rounded-3">
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="py-3">
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr className="my-3" />
    </div>
  );
}
