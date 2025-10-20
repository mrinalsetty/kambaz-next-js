"use client";

import Link from "next/link";
import { Form, FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h3>Sign up</h3>

      <Form>
        <FormControl id="wd-username" placeholder="username" className="mb-2" />

        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />

        <FormControl
          id="wd-password-verify"
          placeholder="verify password"
          type="password"
          className="mb-3"
        />

        <Link
          href="/Account/Profile"
          id="wd-signup-btn"
          className="btn btn-primary w-100 mb-2"
        >
          Sign up
        </Link>

        <Link href="/Account/Signin" id="wd-signin-link">
          Sign in
        </Link>
      </Form>
    </div>
  );
}
