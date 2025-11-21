"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as coursesClient from "../../../client";
import * as accountClient from "../../../../Account/client";

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
};

type Enrollment = { _id: string; user: string; course: string };

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    if (!cid) return;
    Promise.all([
      accountClient.findAllUsers(),
      coursesClient.findAllEnrollments(),
    ])
      .then(([allUsers, allEnrollments]) => {
        setUsers((allUsers as User[]) ?? []);
        setEnrollments((allEnrollments as Enrollment[]) ?? []);
      })
      .catch(() => {});
  }, [cid]);

  const courseUsers = users.filter((u) =>
    enrollments.some((e) => e.user === u._id && e.course === cid)
  );

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {courseUsers.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
