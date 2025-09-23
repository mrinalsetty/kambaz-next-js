import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-assignments-search" />{" "}
      <button id="wd-assignments-add-group">+ Group</button>{" "}
      <button id="wd-assignments-add">+ Assignment</button>
      <section id="wd-assignments-section">
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button>{" "}
        </h3>
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              A1 - ENV + HTML
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
            <br />
            Due May 13 at 11:59pm | 100 points
          </li>
          <li className="wd-assignment-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              A2 - CSS + BOOTSTRAP
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
            <br />
            Due May 20 at 11:59pm | 100 points
          </li>
          <li className="wd-assignment-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              A3 - JAVASCRIPT + REACT
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
            <br />
            Due May 27 at 11:59pm | 100 points
          </li>
        </ul>
      </section>
      <section id="wd-quizzes-section">
        <h3 id="wd-quizzes-title">
          QUIZZES 10% of Total <button>+</button>{" "}
        </h3>
        <ul id="wd-quiz-list">
          <li className="wd-quiz-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Q1 - ENV + HTML
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
            <br />
            Due May 20 at 11:59pm | 29 points
          </li>
          <li className="wd-quiz-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Q2 - CSS + BOOTSTRAP
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
            <br />
            Due May 27 at 11:59pm | 23 points
          </li>
          <li className="wd-quiz-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Q3 - JAVASCRIPT + REACT
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> May 27 at 12:00am |{" "}
            <br />
            Due Jun 3 at 11:59pm | 32 points
          </li>
        </ul>
      </section>
      <section id="wd-exams-section">
        <h3 id="wd-exams-title">
          EXAMS 20% of Total <button>+</button>{" "}
        </h3>
        <ul id="wd-exam-list">
          <li className="wd-exam-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Exam 1 (10% of Total)
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> Oct 27 at 12:00am |{" "}
            <br />
            Due Nov 3 at 11:59pm | 100 points
          </li>
          <li className="wd-exam-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Exam 2 (10% of Total)
            </Link>{" "}
            <br />
            Multiple Modules | <b>Not available until</b> Dec 1 at 12:00am |{" "}
            <br />
            Due Dec 8 at 11:59pm | 103 points
          </li>
        </ul>
      </section>
      <section id="wd-projects-section">
        <h3 id="wd-projects-title">
          PROJECTS 30% of Total <button>+</button>{" "}
        </h3>
        <ul id="wd-project-list">
          <li className="wd-project-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Project - Kambaz Quizzes
            </Link>{" "}
            <br />
            Due Dec 7 at 11:59pm | 100 points
          </li>
          <li className="wd-project-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Project - Kambaz Pazza
            </Link>{" "}
            <br />
            Due Dec 7 at 11:59pm | 100 points
          </li>
          <li className="wd-project-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
              Project - Social Network
            </Link>{" "}
            <br />
            Due Dec 7 at 11:59pm | 100 points
          </li>
        </ul>
      </section>
    </div>
  );
}
