import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="bg-purple-200">{children}</div>
  </>
);

export default layout;
