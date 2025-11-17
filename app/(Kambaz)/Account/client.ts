import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return data;
};
export const signup = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return data;
};
export const profile = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return data;
};
export const signout = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return data;
};
export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return data;
};
export const findAllUsers = async () => {
  const { data } = await axios.get(USERS_API);
  return data;
};
