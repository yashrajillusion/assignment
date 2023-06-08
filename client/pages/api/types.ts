export interface CommonApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface AuthUserData {
  user: User;
  access_token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface LoginReqData {
  password: string;
  phone_number: string;
  google_uid?: string;
}

export interface RegisterReqData {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface Orders {
  _id: string;
  user_id: string;
  sub_total: number;
  phone_number: string;
}

export interface CreateOrderReqData {
  user_id: string;
  sub_total: number;
  phone_number: string;
}
