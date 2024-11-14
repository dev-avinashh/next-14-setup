'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpMethodContextProvider } from '@/context/httpRequestHandler';

interface ILayoutHocProp {
  children: React.ReactNode;
}

const LayoutHoc: React.FC<ILayoutHocProp> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <HttpMethodContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HttpMethodContextProvider>
  );
};

export default LayoutHoc;
