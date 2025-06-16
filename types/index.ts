export enum StatusResponse {
  success = "success",
  error = "error",
}

export type ResponseResult = {
  status: StatusResponse;
  message: string;
  result: any;
  [name: string]: any;
};

export type BodyJWT = {
  id: number;
  username: string;
  fullname: string;
};
