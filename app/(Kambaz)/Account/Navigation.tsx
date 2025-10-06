import Link from "next/link";

export default function AccountNavigation() {
  const spacer = <div style={{ height: "0.5rem" }} />;

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/Account/Signin"
        id="wd-account-signin-link"
        className="list-group-item active border-0 py-2"
      >
        Signin
      </Link>
      {spacer}
      <Link
        href="/Account/Signup"
        id="wd-account-signup-link"
        className="list-group-item text-danger border-0 py-2"
      >
        Signup
      </Link>
      {spacer}
      <Link
        href="/Account/Profile"
        id="wd-account-profile-link"
        className="list-group-item text-danger border-0 py-2"
      >
        Profile
      </Link>
    </div>
  );
}
