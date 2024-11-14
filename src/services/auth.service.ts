import { fetchData } from './apiService';

export const handleRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const data = { name, email, password };
    const response = await fetchData({
      endpoint: '/create',
      method: 'POST',
      data,
      params: { search: 'check' },
      isTokenRequired: false, // isTokenRequired = false for registration
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
