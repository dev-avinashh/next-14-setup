import { ApiResponseData } from '@/types/common';
import axios from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';

type HttpMethodContextType = {
  showApiLoader: boolean;
  setShowApiLoader: React.Dispatch<React.SetStateAction<boolean>>;
  get: (
    endpoint: string,
    showLoader?: boolean,
    isTokenRequired?: boolean
  ) => Promise<ApiResponseData>;
  post: (
    endpoint: string,
    data: object | Array<object>,
    showLoader?: boolean,
    isTokenRequired?: boolean,
    header?: object
  ) => Promise<ApiResponseData>;
  put: (
    endpoint: string,
    data: object | Array<object>,
    showLoader?: boolean,
    isTokenRequired?: boolean
  ) => Promise<ApiResponseData>;
  deleteMe: (
    endpoint: string,
    body: Array<object> | object,
    showLoader?: boolean,
    isTokenRequired?: boolean
  ) => Promise<ApiResponseData>;
};

export const HttpMethodContext = createContext<
  HttpMethodContextType | undefined
>(undefined);

const AxiosService = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

const createApiErrorResponse = (error: unknown): ApiResponseData => {
  let errorMsg = 'Something went wrong';

  if (error instanceof String) {
    errorMsg = error.toString();
  } else if (error instanceof Error) {
    errorMsg = error.message;
  }

  return { success: false, errorMsg, response: {} };
};

export const HttpMethodContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showApiLoader, setShowApiLoader] = useState(false);

  AxiosService.defaults.headers.common.Accept = 'application/json';
  AxiosService.defaults.headers.common['Content-Type'] = 'application/json';

  const get = useCallback(
    async (
      endpoint: string,
      showLoader = true,
      isTokenRequired = false
    ): Promise<ApiResponseData> => {
      setShowApiLoader(showLoader);

      if (isTokenRequired) {
        const token = localStorage.getItem('token'); // Adjust this as needed
        if (token)
          AxiosService.defaults.headers.common['Authorization'] =
            `Bearer ${token}`;
      } else {
        delete AxiosService.defaults.headers.common['Authorization'];
      }

      return AxiosService.get(endpoint)
        .then((res) => {
          console.log(`GET: ${endpoint}:`, res.status);
          return {
            success: true,
            errorMsg: '',
            response: res.data,
          };
        })
        .catch((err) => {
          console.log(`🛑 GET: ${endpoint}:`, err?.response?.data ?? err);
          return createApiErrorResponse(err);
        })
        .finally(() => setShowApiLoader(false));
    },
    [setShowApiLoader]
  );

  const post = useCallback(
    async (
      endpoint: string,
      data: object | Array<object>,
      showLoader = true,
      isTokenRequired = false,
      headers = {}
    ): Promise<ApiResponseData> => {
      setShowApiLoader(showLoader);

      if (isTokenRequired) {
        const token = localStorage.getItem('token'); // Adjust this as needed
        if (token)
          AxiosService.defaults.headers.common['Authorization'] =
            `Bearer ${token}`;
      } else {
        delete AxiosService.defaults.headers.common['Authorization'];
      }

      return AxiosService.post(endpoint, data, { ...headers })
        .then((res) => {
          console.log(`POST: ${endpoint} res`, res.status);
          return {
            success: true,
            errorMsg: '',
            response: res.data,
          };
        })
        .catch((err) => {
          console.log(`🛑 POST - ${endpoint} err`, err?.response?.data ?? err);
          return createApiErrorResponse(err);
        })
        .finally(() => setShowApiLoader(false));
    },
    [setShowApiLoader]
  );

  const put = useCallback(
    async (
      endpoint: string,
      data: object | Array<object>,
      showLoader = true,
      isTokenRequired = false
    ): Promise<ApiResponseData> => {
      setShowApiLoader(showLoader);

      if (isTokenRequired) {
        const token = localStorage.getItem('token'); // Adjust this as needed
        if (token)
          AxiosService.defaults.headers.common['Authorization'] =
            `Bearer ${token}`;
      } else {
        delete AxiosService.defaults.headers.common['Authorization'];
      }

      return AxiosService.put(endpoint, data)
        .then((res) => {
          console.log(`PUT: ${endpoint} res`, res.status);
          return {
            success: true,
            errorMsg: '',
            response: res.data,
          };
        })
        .catch((err) => {
          console.log(`🛑 PUT - ${endpoint} err`, err?.response?.data ?? err);
          return createApiErrorResponse(err);
        })
        .finally(() => setShowApiLoader(false));
    },
    [setShowApiLoader]
  );

  const deleteMe = useCallback(
    async (
      endpoint: string,
      body: Array<object> | object,
      showLoader = true,
      isTokenRequired = false
    ): Promise<ApiResponseData> => {
      setShowApiLoader(showLoader);

      if (isTokenRequired) {
        const token = localStorage.getItem('token'); // Adjust this as needed
        if (token)
          AxiosService.defaults.headers.common['Authorization'] =
            `Bearer ${token}`;
      } else {
        delete AxiosService.defaults.headers.common['Authorization'];
      }

      return AxiosService.delete(endpoint, { data: body })
        .then((res) => {
          console.log(`DELETE: ${endpoint} res`, res.status);
          return {
            success: true,
            errorMsg: '',
            response: res.data,
          };
        })
        .catch((err) => {
          console.log(
            `🛑 DELETE - ${endpoint} err`,
            err?.response?.data ?? err
          );
          return createApiErrorResponse(err);
        })
        .finally(() => setShowApiLoader(false));
    },
    [setShowApiLoader]
  );

  return (
    <HttpMethodContext.Provider
      value={{ showApiLoader, setShowApiLoader, get, post, put, deleteMe }}
    >
      {children}
    </HttpMethodContext.Provider>
  );
};

export const useHttpMethodContext = () => {
  const context = useContext(HttpMethodContext);

  if (!context) {
    throw new Error('useHttpMethodContext must be used within a UserProvider');
  }

  return context;
};
