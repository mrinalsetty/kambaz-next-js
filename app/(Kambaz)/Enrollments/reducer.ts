/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    unenrollCourse: (state, { payload }) => {
      const { user, course } = payload as { user: string; course: string };
      state.enrollments = state.enrollments.filter(
        (enr: any) => !(enr.user === user && enr.course === course)
      );
    },
  },
});

export const { unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
