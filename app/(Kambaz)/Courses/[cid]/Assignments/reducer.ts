import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Assignment } from "../../client";

const DEFAULT_DESC = "Assignment description and submission instructions.";

interface AssignmentsState {
  assignments: Assignment[];
}
const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }: PayloadAction<Assignment[]>) => {
      state.assignments = payload;
    },
    addAssignment: (state, { payload: a }: PayloadAction<Assignment>) => {
      const newAssignment: Assignment = {
        _id: a._id ?? uuidv4(),
        title: a.title ?? "New Assignment",
        course: a.course,
        group: a.group ?? "ASSIGNMENTS",
        points: a.points ?? 100,
        description:
          (typeof a.description === "string" && a.description.trim()) ||
          DEFAULT_DESC,
        availableFrom: a.availableFrom ?? "",
        availableUntil: a.availableUntil ?? "",
        dueDate: a.dueDate ?? "",
        published: (a as any).published ?? false,
        editing: false,
      } as Assignment & { published?: boolean; editing?: boolean };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (
      state,
      { payload: assignmentId }: PayloadAction<string>
    ) => {
      state.assignments = state.assignments.filter(
        (asmt) => asmt._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: a }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((asmt) =>
        asmt._id === a._id ? a : asmt
      );
    },
    editAssignment: (
      state,
      { payload: assignmentId }: PayloadAction<string>
    ) => {
      state.assignments = state.assignments.map((asmt) =>
        asmt._id === assignmentId ? { ...asmt, editing: true } : asmt
      );
    },
    togglePublish: (
      state,
      { payload: assignmentId }: PayloadAction<string>
    ) => {
      state.assignments = state.assignments.map((asmt: any) =>
        asmt._id === assignmentId
          ? { ...asmt, published: !asmt.published }
          : asmt
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  togglePublish,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
