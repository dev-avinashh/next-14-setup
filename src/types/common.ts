export type ApiResponseData = {
  success: boolean;
  errorMsg: string;
  response: object | Array<object>;
};

type IHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IFetchDataOptions {
  endpoint: string;
  method?: IHttpMethod;
  data?: object | null;
  params?: Record<string, any>; // Query parameters
  isTokenRequired?: boolean;
  //   cancelToken?: CancelTokenSource; // For canceling requests
}

export interface IFormData {
  name: string;
  email: string;
  password: string;
}
