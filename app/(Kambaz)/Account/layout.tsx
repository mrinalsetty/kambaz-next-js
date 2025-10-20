import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";

export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-account">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Account
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <AccountNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
