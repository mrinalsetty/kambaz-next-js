/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";
import { setCurrentUser } from "../Account/reducer";
const defaultCourseDraft = () => ({
  _id: "0",
  name: "New Course",
  number: "New Number",
  startDate: "2023-09-10",
  endDate: "2023-12-15",
  image: "/images/reactjs.jpg",
  description: "New Description",
});

const initialState = {
  courses: courses,
  dashboardShowAll: false as boolean,
  courseDraft: defaultCourseDraft() as any,
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setDashboardShowAll: (state, { payload }: { payload: boolean }) => {
      state.dashboardShowAll = payload;
    },
    setCourseDraft: (state, { payload: draft }) => {
      state.courseDraft = { ...state.courseDraft, ...draft } as any;
    },
    addNewCourse: (state, { payload: course }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course: any) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
  },
  extraReducers: (builder) => {
    // Reset UI-only state when the logged-in user changes
    builder.addCase(setCurrentUser, (state) => {
      state.dashboardShowAll = false;
      state.courseDraft = defaultCourseDraft() as any;
    });
  },
});
export const {
  setDashboardShowAll,
  setCourseDraft,
  addNewCourse,
  deleteCourse,
  updateCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;
