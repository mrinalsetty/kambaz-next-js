"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import type { RootState } from "./store";
import { useEffect, useRef } from "react";
import { resetCourses } from "./Courses/reducer";
import { resetModules } from "./Courses/[cid]/Modules/reducer";
import { resetAssignments } from "./Courses/[cid]/Assignments/reducer";

function UserStateBoundary({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const uid = currentUser?._id ?? null;
    if (lastUserIdRef.current === null) {
      lastUserIdRef.current = uid;
      return;
    }
    if (uid !== lastUserIdRef.current) {
      dispatch(resetCourses());
      dispatch(resetModules());
      dispatch(resetAssignments());
      lastUserIdRef.current = uid;
    }
  }, [currentUser, dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UserStateBoundary>{children}</UserStateBoundary>
    </Provider>
  );
}
