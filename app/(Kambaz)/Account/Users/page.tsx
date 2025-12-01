"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import type { User } from "../client";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { uid } = useParams();
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, [uid]);
  return (
    <div>
      <h3>Users</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
