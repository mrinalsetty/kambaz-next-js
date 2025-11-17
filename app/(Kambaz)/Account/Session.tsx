"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const user = await client.profile();
      if (user) dispatch(setCurrentUser(user));
    } catch (e) {
      // ignore not logged in
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (pending) return null;
  return children;
}
