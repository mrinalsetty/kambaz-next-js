"use client";

import Link from "next/link";
import { Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  interface SignupUser {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }
  const [user, setUser] = useState<SignupUser>({ username: "", password: "" });
  const dispatch = useDispatch();
  const signup = async () => {
    try {
      const current = await client.signup(user);
      if (current) dispatch(setCurrentUser(current));
    } catch {
      // handle error later
    }
  };
  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3>Sign up</h3>

      <Form>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
          value={user.username || ""}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <FormControl
          id="wd-password-verify"
          placeholder="verify password"
          type="password"
          className="mb-3"
        />

        <button
          id="wd-signup-btn"
          onClick={signup}
          className="btn btn-primary w-100 mb-2"
          type="button"
        >
          Sign up
        </button>

        <Link href="/Account/Signin" id="wd-signin-link">
          Sign in
        </Link>
      </Form>
    </div>
  );
}
