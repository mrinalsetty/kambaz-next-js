"use client";

import { redirect } from "next/dist/client/components/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountPage() {
  const currentUser = useSelector((state: RootState) => state.accountReducer);

  if (!currentUser) {
    redirect("/Account/Signin");
  } else {
    redirect("/Account/Profile");
  }

  return null;
}
