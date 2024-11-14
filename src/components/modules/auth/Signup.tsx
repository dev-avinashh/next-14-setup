'use client';
import React, { ChangeEvent, useState } from 'react';
import { handleRegister } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

interface IFormData {
  name: string;
  email: string;
  password: string;
}

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    password: '',
  });

  const mutation = useMutation({
    mutationFn: () =>
      handleRegister(formData.name, formData.email, formData.password),
    onSuccess: (response) => {
      console.log('Registration successful:', response);
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 mt-1 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};
