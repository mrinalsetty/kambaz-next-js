"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";

type PeopleUser = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  loginId?: string;
  section?: string;
  totalActivity?: string;
};

interface PeopleDetailsProps {
  uid: string | null;
  onClose: () => void;
}

export default function PeopleDetails({ uid, onClose }: PeopleDetailsProps) {
  const [user, setUser] = useState<PeopleUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;
      const fetched = await client.findUserById(uid);
      setUser(fetched as PeopleUser);
    };

    if (uid) {
      fetchUser();
    }
  }, [uid]);

  // If there is no id, don’t render the panel
  if (!uid) return null;

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
      <div className="text-danger fs-4 wd-name">
        {user?.firstName} {user?.lastName}
      </div>
      <b>Roles:</b> <span className="wd-roles">{user?.role}</span>
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user?.loginId}</span>
      <br />
      <b>Section:</b> <span className="wd-section">{user?.section}</span>
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user?.totalActivity}</span>
    </div>
  );
}
