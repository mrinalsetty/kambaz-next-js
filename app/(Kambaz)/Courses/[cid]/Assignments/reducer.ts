/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: a }) => {
      const newAssignment: any = {
        _id: a._id ?? uuidv4(),
        title: a.title ?? "New Assignment",
        course: a.course,
        group: a.group ?? "ASSIGNMENTS",
        points: a.points ?? 100,
        description: a.description ?? "",
        availableFrom: a.availableFrom ?? "",
        availableUntil: a.availableUntil ?? "",
        dueDate: a.dueDate ?? "",
        published: a.published ?? false,
        editing: false,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (asmt: any) => asmt._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: a }) => {
      state.assignments = state.assignments.map((asmt: any) =>
        asmt._id === a._id ? a : asmt
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((asmt: any) =>
        asmt._id === assignmentId ? { ...asmt, editing: true } : asmt
      ) as any;
    },
    togglePublish: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((asmt: any) =>
        asmt._id === assignmentId
          ? { ...asmt, published: !asmt.published }
          : asmt
      ) as any;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  togglePublish,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
