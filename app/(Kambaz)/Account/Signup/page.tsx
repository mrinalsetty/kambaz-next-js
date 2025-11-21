"use client";

import Link from "next/link";
import { Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [verify, setVerify] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const signup = async () => {
    if (user.password !== verify) {
      setError("Passwords do not match");
      return;
    }
    try {
      const created = await client.signup(user);
      if (!created) {
        setError("Signup failed");
        return;
      }
      setError(null);
      router.push("/Account/Signin");
    } catch (e: unknown) {
      let message = "Signup failed";
      if (e instanceof Error && e.message) message = e.message;
      setError(message);
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
          value={verify}
          onChange={(e) => setVerify(e.target.value)}
        />

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

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
