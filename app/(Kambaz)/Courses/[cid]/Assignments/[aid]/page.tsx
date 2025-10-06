"use client";

import {
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

export default function AssignmentEditor() {
  const boxStyle: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
  };

  const dottedRed: React.CSSProperties = {
    color: "#2b363d",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: "#dc2626",
  };

  return (
    <div id="wd-assignments-editor" className="p-3" style={{ maxWidth: 720 }}>
      <Form>
        <FormGroup className="mb-3">
          <FormLabel className="fw-bold">Assignment Name</FormLabel>
          <FormControl defaultValue="A1 - ENV + HTML" />
        </FormGroup>

        <FormGroup className="mb-4">
          <div className="p-4" style={{ ...boxStyle }}>
            <p className="mb-3" style={{ color: "#2b363d" }}>
              The assignment is{" "}
              <span className="text-danger">available online</span>
            </p>

            <p className="mb-3" style={{ color: "#2b363d" }}>
              Submit a link to the landing page of your Web application running
              on <span style={dottedRed}>Netlify</span>.
            </p>

            <p className="mb-2" style={{ color: "#2b363d" }}>
              The landing page should include the following:
            </p>
            <ul className="mb-3" style={{ color: "#2b363d" }}>
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>
                Link to the <span style={dottedRed}>Kanbas</span> application
              </li>
              <li>Links to all relevant source code repositories</li>
            </ul>

            <p className="mb-0" style={{ color: "#2b363d" }}>
              The <span style={dottedRed}>Kanbas</span> application should
              include a link to navigate back to the landing page.
            </p>
          </div>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Points
          </FormLabel>
          <Col sm={9}>
            <FormControl type="number" defaultValue={100} />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Assignment Group
          </FormLabel>
          <Col sm={9}>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECTS">PROJECTS</option>
            </Form.Select>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Display Grade as
          </FormLabel>
          <Col sm={9}>
            <Form.Select defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Grade Letter">Grade Letter</option>
              <option value="GPA">GPA</option>
            </Form.Select>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Submission Type
          </FormLabel>
          <Col sm={9}>
            <div className="p-3" style={boxStyle}>
              <Form.Select defaultValue="Online" className="mb-3">
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
              </Form.Select>

              <div className="mb-2 fw-semibold">Online Entry Options</div>
              <Form.Check
                id="wd-text-entry"
                type="checkbox"
                label="Text Entry"
              />
              <Form.Check
                id="wd-website-url"
                type="checkbox"
                label="Website URL"
              />
              <Form.Check
                id="wd-media-recordings"
                type="checkbox"
                label="Media Recordings"
              />
              <Form.Check
                id="wd-student-annotation"
                type="checkbox"
                label="Student Annotation"
              />
              <Form.Check
                id="wd-file-upload"
                type="checkbox"
                label="File Upload"
              />
            </div>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Assign
          </FormLabel>
          <Col sm={9}>
            <div className="p-3" style={boxStyle}>
              <div className="mb-1">Assign to</div>
              <FormControl defaultValue="Everyone" className="mb-3" />

              <div className="mb-1">Due</div>
              <FormControl
                type="date"
                defaultValue="2024-05-13"
                className="mb-3"
              />

              <div className="row g-3">
                <div className="col-6">
                  <FormLabel htmlFor="wd-available-from" className="mb-1">
                    Available from
                  </FormLabel>
                  <FormControl
                    id="wd-available-from"
                    type="date"
                    defaultValue="2024-05-06"
                  />
                </div>
                <div className="col-6">
                  <FormLabel htmlFor="wd-available-until" className="mb-1">
                    Until
                  </FormLabel>
                  <FormControl
                    id="wd-available-until"
                    type="date"
                    defaultValue="2024-05-20"
                  />
                </div>
              </div>
            </div>
          </Col>
        </FormGroup>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          <Button
            id="wd-cancel-assignment"
            variant="light"
            className="border"
            style={{ borderColor: "#d0d7de" }}
          >
            Cancel
          </Button>
          <Button id="wd-save-assignment" variant="danger">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
