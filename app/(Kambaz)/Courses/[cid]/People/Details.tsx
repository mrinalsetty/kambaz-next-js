"use client";

import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FormControl } from "react-bootstrap";
import * as client from "../../../Account/client";
import type { User } from "../../../Account/client";

type PeopleUser = User;

interface PeopleDetailsProps {
  uid: string | null;
  onClose: () => void;
}

export default function PeopleDetails({ uid, onClose }: PeopleDetailsProps) {
  const [user, setUser] = useState<PeopleUser | null>(null);

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;
      const fetched = await client.findUserById(uid);
      setUser(fetched as PeopleUser);

      const fullName = `${fetched.firstName ?? ""} ${
        fetched.lastName ?? ""
      }`.trim();
      setName(fullName);
    };

    if (uid) {
      fetchUser();
    }
  }, [uid]);

  if (!uid) return null;

  const handleDelete = async () => {
    if (!uid) return;
    await client.deleteUser(uid);
    onClose();
  };

  const saveUser = async () => {
    if (!user || !uid) return;

    const trimmed = name.trim();
    const [firstName, ...rest] = trimmed.split(" ");
    const lastName = rest.join(" ");

    const updatedUser: PeopleUser = {
      ...user,
      _id: uid,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
    };

    const saved = await client.updateUser(updatedUser);
    setUser(saved as PeopleUser);
    setEditing(false);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user?.firstName} {user?.lastName}
          </div>
        )}

        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName ?? ""} ${
              user.lastName ?? ""
            }`.trim()}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Roles:</b> <span className="wd-roles">{user?.role}</span>
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user?.loginId}</span>
      <br />
      <b>Section:</b> <span className="wd-section">{user?.section}</span>
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user?.totalActivity}</span>
      <hr />
      <button
        onClick={handleDelete}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
