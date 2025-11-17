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

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch {
      // silent fail or add alert later
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

        <Button
          id="wd-signin-btn"
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
