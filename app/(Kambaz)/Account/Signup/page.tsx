import Link from "next/link";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input placeholder="username" className="wd-username" />
      <br />
      <input placeholder="password" type="password" className="wd-password" />
      <br />
      <input
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
      />
      <br />
      <Link href="Profile"> Sign up </Link>
      <br />
      <Link href="Signin"> Sign in </Link>
    </div>
  );
}
