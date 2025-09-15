import Link from "next/link";
export default function KambazNavigation() {
  return (
    <div id="wd-kambaz-navigation">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">
        Northeastern
      </a>
      <br />
      <Link href="/Account" id="wd-account-link">
        Account
      </Link>
      <br />
      <Link href="/Dashboard" id="wd-dashboard-link">
        Dashboard
      </Link>
      <br />
      <Link href="/Dashboard" id="wd-course-link">
        Courses
      </Link>
      <br />
      <Link href="/Calendar" id="wd-calendar-link">
        Calendar
      </Link>
      <br />
      <Link href="/Inbox" id="wd-inbox-link">
        Inbox
      </Link>
      <br />
      <Link href="/Labs" id="wd-labs-link">
        Labs
      </Link>
      <br />
    </div>
  );
}
