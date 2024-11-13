import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-500">
            Home
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-500">
            Analytics
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-500">
            Settings
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-500">
            Profile
          </a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-blue-500">
            Logout
          </a>
        </nav>
      </aside>

      {children}
    </div>
  </>
);

export default layout;
