"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountPage() {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.replace("/Account/Profile");
    } else {
      router.replace("/Account/Signin");
    }
  }, [currentUser, router]);

  return null;
}
