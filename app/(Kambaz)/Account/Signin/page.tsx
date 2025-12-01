"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      setError(null);
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (e: unknown) {
      let message = "Sign in failed";
      if (e instanceof Error && e.message) {
        message = e.message;
      }
      setError(message);
    }
  };

  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3>Sign in</h3>

      <Form>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />

        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-3"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <Button
          id="wd-signin-btn"
          type="button"
          className="w-100 mb-2"
          onClick={signin}
          variant="primary"
        >
          Sign in
        </Button>

        <Link href="/Account/Signup" id="wd-signup-link">
          Sign up
        </Link>
      </Form>
    </div>
  );
}
