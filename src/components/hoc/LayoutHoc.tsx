'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ILayoutHocProp {
  children: React.ReactNode;
}

const LayoutHoc: React.FC<ILayoutHocProp> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default LayoutHoc;
