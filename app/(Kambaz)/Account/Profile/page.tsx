"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import type { User } from "../client";
import { redirect } from "next/dist/client/components/navigation";
import { Form, FormControl } from "react-bootstrap";

// Use the shared User type from the account client (with optional fields)

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  ) as User | null;

  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser]);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };
  const updateProfile = async () => {
    if (!profile) return;
    const updated = await client.updateUser(profile);
    dispatch(setCurrentUser(updated));
    setProfile(updated);
  };

  if (!profile) return null;
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3>Profile</h3>

      <Form>
        <FormControl
          id="wd-username"
          className="mb-2"
          placeholder="username"
          defaultValue={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />

        <FormControl
          id="wd-password"
          className="mb-2"
          placeholder="password"
          type="password"
          defaultValue={profile.password}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />

        <FormControl
          id="wd-firstname"
          className="mb-2"
          placeholder="First Name"
          defaultValue={profile.firstName}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />

        <FormControl
          id="wd-lastname"
          className="mb-2"
          placeholder="Last Name"
          defaultValue={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />

        <FormControl
          id="wd-dob"
          className="mb-2"
          type="date"
          defaultValue={profile.dob}
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />

        <FormControl
          id="wd-email"
          className="mb-2"
          type="email"
          defaultValue={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <Form.Select
          id="wd-role"
          className="mb-3"
          defaultValue={profile.role ?? "USER"}
          onChange={(e) =>
            setProfile({ ...profile, role: e.target.value as User["role"] })
          }
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>

        <button
          id="wd-update-profile"
          className="btn btn-primary w-100 mb-2"
          onClick={updateProfile}
        >
          Update
        </button>
        <button
          id="wd-signout-btn"
          className="btn btn-danger w-100"
          onClick={signout}
        >
          Sign out
        </button>
      </Form>
    </div>
  );
}
