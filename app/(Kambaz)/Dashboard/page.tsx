import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="React JS"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/ai.jpg"
              width={200}
              height={150}
              alt="Artificial Intelligence"
            />
            <div>
              <h5> CS1234 Artificial Intelligence </h5>
              <p className="wd-dashboard-course-title">AI Engineer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/ml.jpg"
              width={200}
              height={150}
              alt="Machine Learning"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/html.jpg" width={200} height={150} alt="HTML" />
            <div>
              <h5> CS1234 HTML </h5>
              <p className="wd-dashboard-course-title">Frontend Developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/css.jpg" width={200} height={150} alt="CSS" />
            <div>
              <h5> CS1234 CSS </h5>
              <p className="wd-dashboard-course-title">Frontend Developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/javascript.jpg"
              width={200}
              height={150}
              alt="JavaScript"
            />
            <div>
              <h5> CS1234 JavaScript </h5>
              <p className="wd-dashboard-course-title">Frontend Developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/python.jpg"
              width={200}
              height={150}
              alt="Python"
            />
            <div>
              <h5> CS1234 Python </h5>
              <p className="wd-dashboard-course-title">Backend Developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/cpp.jpg" width={200} height={150} alt="C++" />
            <div>
              <h5> CS1234 C++ </h5>
              <p className="wd-dashboard-course-title">
                C++ Developer/Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/csharp.jpg" width={200} height={150} alt="C#" />
            <div>
              <h5> CS1234 C# </h5>
              <p className="wd-dashboard-course-title">C# Developer/Engineer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/rubyonrails.jpg"
              width={200}
              height={150}
              alt="Ruby on Rails"
            />
            <div>
              <h5> CS1234 Ruby on Rails </h5>
              <p className="wd-dashboard-course-title">
                Ruby on Rails Developer/Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/api.jpg" width={200} height={150} alt="API" />
            <div>
              <h5> CS1234 API </h5>
              <p className="wd-dashboard-course-title">Full Stack Developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/agenticai.jpg"
              width={200}
              height={150}
              alt="Agentic AI"
            />
            <div>
              <h5> CS1234 Agentic AI </h5>
              <p className="wd-dashboard-course-title">AI Engineer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
