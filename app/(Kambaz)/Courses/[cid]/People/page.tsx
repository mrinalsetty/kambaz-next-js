"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as coursesClient from "../../client";
import * as accountClient from "../../../Account/client";
import PeopleTable from "./Table";

type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
};

type Enrollment = { _id: string; user: string; course: string };

export default function People() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const fetchData = async () => {
    if (!cid) return;
    try {
      const [allUsers, allEnrollments] = await Promise.all([
        accountClient.findAllUsers(),
        coursesClient.findAllEnrollments(),
      ]);
      setUsers((allUsers as User[]) ?? []);
      setEnrollments((allEnrollments as Enrollment[]) ?? []);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, [cid]);

  const courseUsers = users.filter((u) =>
    enrollments.some((e) => e.user === u._id && e.course === cid)
  );

  return <PeopleTable users={courseUsers} fetchUsers={fetchData} />;
}
