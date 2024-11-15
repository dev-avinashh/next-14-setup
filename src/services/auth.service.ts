import { handleRequests } from './apiService';

export const handleRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const data = { name, email, password };
    const response = await handleRequests({
      endpoint: '/create',
      method: 'POST',
      data,
      params: { search: 'check' },
      isTokenRequired: false,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
