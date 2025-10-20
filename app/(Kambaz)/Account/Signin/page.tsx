"use client";

import Link from "next/link";
import { Form, FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3>Sign in</h3>

      <Form>
        <FormControl id="wd-username" placeholder="username" className="mb-2" />

        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-3"
        />

        <Link
          href="/Dashboard"
          id="wd-signin-btn"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in
        </Link>

        <Link href="/Account/Signup" id="wd-signup-link">
          Sign up
        </Link>
      </Form>
    </div>
  );
}
