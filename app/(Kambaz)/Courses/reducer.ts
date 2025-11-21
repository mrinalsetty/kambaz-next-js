import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Course, Enrollment } from "./client";

interface CoursesState {
  courses: Course[];
  allCourses: Course[];
  enrollments: Enrollment[];
  viewMode: "ENROLLED" | "ALL";
}
const initialState: CoursesState = {
  courses: [],
  allCourses: [],
  enrollments: [],
  viewMode: "ENROLLED",
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    resetCourses: () => initialState,
    addNewCourse: (state, { payload: course }: PayloadAction<Course>) => {
      const newCourse: Course = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },
    updateCourse: (state, { payload: course }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },
    setCourses: (state, { payload: courses }: PayloadAction<Course[]>) => {
      state.courses = courses;
    },
    setAllCourses: (state, { payload }: PayloadAction<Course[]>) => {
      state.allCourses = payload;
    },
    setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
      state.enrollments = payload;
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === "ENROLLED" ? "ALL" : "ENROLLED";
    },
  },
});
export const {
  resetCourses,
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
  setAllCourses,
  setEnrollments,
  toggleViewMode,
} = coursesSlice.actions;
export default coursesSlice.reducer;
