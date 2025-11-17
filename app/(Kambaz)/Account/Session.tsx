"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = useCallback(async () => {
    try {
      const user = await client.profile();
      if (user) dispatch(setCurrentUser(user));
    } catch {
      // ignore not logged in
    }
    setPending(false);
  }, [dispatch]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  if (pending) return null;
  return <>{children}</>;
}
