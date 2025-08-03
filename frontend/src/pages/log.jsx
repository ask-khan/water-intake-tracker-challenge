// LogPage: Form to log water intake for a selected user and day
import React, { useState } from 'react';

const LogPage = () => {
  // State for form fields and status
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [intakeMl, setIntakeMl] = useState('');
  const [status, setStatus] = useState('idle');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('idle');
    try {
      const res = await fetch('http://localhost:3001/water-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, date, intakeMl: Number(intakeMl) }),
      });
      if (res.ok) {
        setStatus('success');
        setUserId('');
        setDate('');
        setIntakeMl('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // Render the log form UI
  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Log Water Intake</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
          <input id="userId" type="text" value={userId} onChange={e => setUserId(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="intakeMl" className="block text-sm font-medium text-gray-700 mb-1">Intake (ml)</label>
          <input id="intakeMl" type="number" value={intakeMl} onChange={e => setIntakeMl(e.target.value)} required min={0} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">Log Intake</button>
      </form>
      {status === 'success' && <p className="mt-4 text-green-600 text-center">Logged successfully!</p>}
      {status === 'error' && <p className="mt-4 text-red-600 text-center">Failed to log intake.</p>}
    </div>
  );
};

export default LogPage;
