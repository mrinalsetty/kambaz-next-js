"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import type { User } from "../client";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { uid } = useParams();

  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers);
  };

  const filterUsersByRole = async (roleValue: string) => {
    setRole(roleValue);
    if (roleValue) {
      const filtered = await client.findUsersByRole(roleValue);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (nameValue: string) => {
    setName(nameValue);
    if (nameValue.trim()) {
      const filtered = await client.findUsersByPartialName(nameValue);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const handleCreateUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>

      <button
        onClick={handleCreateUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <div className="mb-3 clearfix">
        <FormControl
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name"
        />

        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
