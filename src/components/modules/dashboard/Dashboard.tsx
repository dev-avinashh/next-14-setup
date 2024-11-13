import React from 'react';

export const Dashboard: React.FC = () => (
  <main className="flex-1 p-8 bg-white">
    <h1 className="text-3xl font-semibold mb-6 text-black">
      Welcome to the Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Overview</h2>
        <p className="text-gray-700">Some brief overview or statistics here.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Users</h2>
        <p className="text-gray-700">
          Details about user engagement or metrics.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Reports</h2>
        <p className="text-gray-700">Monthly or weekly reports overview.</p>
      </div>
    </div>

    {/* Data Table */}
    <section className="mt-10 text-black">
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
    </section>
  </main>
);
