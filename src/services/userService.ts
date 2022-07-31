import { post } from "./httpRequest";

const BASE_URL = "/users";
const URL_CREATE = `${BASE_URL}/create`;
const URL_LOGIN = `${BASE_URL}/login`;

interface IUserResponse {
  isError: boolean;
  data: IUser;
}
interface IUser {
  message?: string;
  token?: string;
  details?: string;
}

export async function requestCreateUser(
  email: string,
  password: string
): Promise<IUserResponse> {
  return await post(URL_CREATE, { email, password });
}

export async function requestLoginUser(
  email: string,
  password: string
): Promise<IUserResponse> {
  return await post(URL_LOGIN, { email, password });
}
