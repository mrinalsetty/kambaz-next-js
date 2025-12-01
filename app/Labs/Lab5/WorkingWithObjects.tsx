"use client";
import React, { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [moduleObj, setModuleObj] = useState({
    id: "m1",
    name: "Intro",
    description: "Overview",
    course: "CS5610",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <a
        id="wd-retrieve-module"
        className="btn btn-secondary"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-secondary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <br />
      <br />
      <a
        id="wd-update-assignment-score"
        className="btn btn-outline-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        className="w-25"
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })
        }
      />
      <br />
      <br />
      <a
        id="wd-update-assignment-completed"
        className="btn btn-outline-secondary float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <FormCheck
        id="wd-assignment-completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
        label="Completed"
      />
      <br />
      <hr />
      <h4>Module Edits</h4>
      <div className="d-flex align-items-center mb-3" id="wd-module-name-row">
        <FormControl
          className="flex-grow-1 me-2"
          id="wd-module-name"
          defaultValue={moduleObj.name}
          onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
        />
        <a
          id="wd-update-module-name"
          className="btn btn-secondary"
          href={`${MODULE_API_URL}/name/${moduleObj.name}`}
        >
          Update Module Name
        </a>
      </div>
      <div
        className="d-flex align-items-center mb-3"
        id="wd-module-description-row"
      >
        <FormControl
          className="flex-grow-1 me-2"
          id="wd-module-description"
          defaultValue={moduleObj.description}
          onChange={(e) =>
            setModuleObj({ ...moduleObj, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-outline-secondary"
          href={`${MODULE_API_URL}/description/${moduleObj.description}`}
        >
          Update Module Description
        </a>
      </div>
      <hr />
    </div>
  );
}
