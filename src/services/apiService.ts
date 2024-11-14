import axiosInstance from './axiosClient';
import axios from 'axios';

type IHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface IFetchDataOptions {
  endpoint: string;
  method?: IHttpMethod;
  data?: object | null;
  params?: Record<string, any>; // Query parameters
  isTokenRequired?: boolean;
  //   cancelToken?: CancelTokenSource; // For canceling requests
}

export const fetchData = async ({
  endpoint,
  method = 'GET',
  data = null,
  params = {},
  isTokenRequired = false,
  //   cancelToken,
}: IFetchDataOptions) => {
  try {
    const config: any = {
      method,
      url: endpoint,
      data,
      params,
      //   cancelToken: cancelToken?.token, // Add cancelToken to the request if provided
    };

    // If token is required, add Authorization header
    if (isTokenRequired) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        throw new Error('Token is required, but not found');
      }
    }

    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    // Handle cancellation error
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error('API error:', error);
      throw error;
    }
  }
};