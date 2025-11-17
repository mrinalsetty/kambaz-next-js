import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import Providers from "./providers";
import Session from "./Account/Session";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">
          <Providers>
            <Session>{children}</Session>
          </Providers>
        </div>
      </div>
    </div>
  );
}
