import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

// Types
export interface Course {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
}
export interface Lesson {
  _id?: string;
  name: string;
  description?: string;
  module?: string;
}
export interface Module {
  _id?: string;
  name: string;
  course: string;
  description?: string;
  lessons?: Lesson[];
  editing?: boolean;
}
export interface Assignment {
  _id?: string;
  title: string;
  course: string;
  group?: string;
}
export interface Enrollment {
  _id?: string;
  user: string;
  course: string;
}

// Courses
export const fetchMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data as Course[];
};
export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get(COURSES_API);
  return data as Course[];
};
export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data as Course;
};
export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data as Course;
};
export const deleteCourse = async (courseId: string): Promise<void> => {
  await axios.delete(`${COURSES_API}/${courseId}`);
};

// Modules
export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return data as Module[];
};
export const createModuleForCourse = async (
  courseId: string,
  module: Module
): Promise<Module> => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data as Module;
};
export const deleteModule = async (moduleId: string): Promise<void> => {
  await axios.delete(`${MODULES_API}/${moduleId}`);
};
export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data as Module;
};

// Assignments (basic CRUD)
export const findAssignmentsForCourse = async (
  courseId: string
): Promise<Assignment[]> => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data as Assignment[];
};
export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data as Assignment;
};
export const updateAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data as Assignment;
};
export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};

// Enrollments
export const fetchMyEnrollments = async (): Promise<Enrollment[]> => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return data as Enrollment[];
};
export const enrollInCourse = async (courseId: string): Promise<Enrollment> => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/enroll`
  );
  return data as Enrollment;
};
export const unenrollFromCourse = async (courseId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/enroll`);
};
