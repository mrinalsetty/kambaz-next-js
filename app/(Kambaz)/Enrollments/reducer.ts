/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload }) => {
      const { user, course } = payload as { user: string; course: string };
      const already = state.enrollments.some(
        (enr: any) => enr.user === user && enr.course === course
      );
      if (already) return;
      state.enrollments = [
        ...state.enrollments,
        { _id: uuidv4(), user, course },
      ];
    },
    unenrollCourse: (state, { payload }) => {
      const { user, course } = payload as { user: string; course: string };
      state.enrollments = state.enrollments.filter(
        (enr: any) => !(enr.user === user && enr.course === course)
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
