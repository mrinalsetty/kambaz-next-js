import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER as string;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export interface Credentials {
  username: string;
  password: string;
}
export interface User {
  _id?: string;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

export const signin = async (credentials: Credentials): Promise<User> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return data as User;
};
export const signup = async (user: User): Promise<User> => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return data as User;
};
export const profile = async (): Promise<User> => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return data as User;
};
export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};
export const updateUser = async (user: User): Promise<User> => {
  const { data } = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return data as User;
};
export const findAllUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(USERS_API);
  return data as User[];
};
