import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Course, Enrollment } from "./client";

interface CourseDraft {
  _id?: string;
  name: string;
  description: string;
  image: string;
}
interface CoursesState {
  courses: Course[];
  allCourses: Course[];
  enrollments: Enrollment[];
  viewMode: "ENROLLED" | "ALL";
  courseDraft: CourseDraft;
}
const initialState: CoursesState = {
  courses: [],
  allCourses: [],
  enrollments: [],
  viewMode: "ENROLLED",
  courseDraft: {
    name: "New Course",
    description: "New Description",
    image: "/images/reactjs.jpg",
  },
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
    setCourseDraftField: (
      state,
      { payload }: PayloadAction<{ field: keyof CourseDraft; value: string }>
    ) => {
      const { field, value } = payload;
      if (field === "_id") return; // avoid overriding id here
      // Narrow assignment without using any
      if (field === "name") state.courseDraft.name = value;
      else if (field === "description") state.courseDraft.description = value;
      else if (field === "image") state.courseDraft.image = value;
    },
    setCourseDraft: (state, { payload }: PayloadAction<CourseDraft>) => {
      state.courseDraft = payload;
    },
    resetCourseDraft: (state) => {
      state.courseDraft = {
        name: "New Course",
        description: "New Description",
        image: "/images/reactjs.jpg",
      };
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
  setCourseDraftField,
  setCourseDraft,
  resetCourseDraft,
} = coursesSlice.actions;
export default coursesSlice.reducer;
