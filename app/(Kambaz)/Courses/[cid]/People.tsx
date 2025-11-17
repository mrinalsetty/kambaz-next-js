"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as coursesClient from "../../Courses/client";
import * as accountClient from "../../Account/client";

interface User {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}
interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export default function People() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    if (!cid) return;
    Promise.all([
      accountClient.findAllUsers(),
      coursesClient.fetchMyEnrollments(), // current user's enrollments only
      // fetch all enrollments to list everyone
      fetch(`${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/enrollments`).then(
        (r) => r.json()
      ),
    ])
      .then(([allUsers, myEnrollments, allEnrollments]) => {
        setUsers(allUsers as User[]);
        // prefer all enrollments if available
        setEnrollments(
          (allEnrollments as Enrollment[]) || (myEnrollments as Enrollment[])
        );
      })
      .catch(() => {});
  }, [cid]);

  const enrolledUserIds = enrollments
    .filter((e) => e.course === cid)
    .map((e) => e.user);
  const enrolledUsers = users.filter((u) => enrolledUserIds.includes(u._id));

  return (
    <div className="mt-4" id="wd-people">
      <h5 className="mb-3">People Enrolled</h5>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{[u.firstName, u.lastName].filter(Boolean).join(" ")}</td>
              <td>{u.role}</td>
            </tr>
          ))}
          {!enrolledUsers.length && (
            <tr>
              <td colSpan={3} className="text-muted">
                No people enrolled yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
