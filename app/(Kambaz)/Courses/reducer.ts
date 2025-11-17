import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Course } from "./client";

interface CoursesState {
  courses: Course[];
}
const initialState: CoursesState = {
  courses: [],
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }: PayloadAction<Course>) => {
      const newCourse: Course = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },
    updateCourse: (state, { payload: course }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) => (c._id === course._id ? course : c));
    },
    setCourses: (state, { payload: courses }: PayloadAction<Course[]>) => {
      state.courses = courses;
    },
  },
});
export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
