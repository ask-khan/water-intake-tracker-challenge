// SummaryPage: Displays water intake summary and goal achievement for the last 7 days
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

const USER_ID = '1'; // Replace with actual user id logic

const SummaryPage = () => {
  // State for summary data, loading, and error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch summary data from backend
  useEffect(() => {
    fetch(`http://localhost:3001/water-summary/${USER_ID}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then((apiData) => {
        // Map API response to chart data
        setData(apiData.map(day => ({
          date: day.date,
          intakeMl: day.totalIntake,
          percentageOfGoal: day.percentageOfGoal,
        })));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Count days meeting or exceeding the goal (percentageOfGoal >= 1)
  const daysMetGoal = data.filter(day => day.percentageOfGoal >= 1).length;

  // Render the summary chart and feedback UI
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Water Intake Summary (Last 7 Days)</h2>
      {daysMetGoal >= 5 && (
        <div className="mb-4 text-green-600 text-center text-lg font-semibold">Well done!</div>
      )}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">Failed to load summary.</p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={date => new Date(date).toLocaleDateString()} />
              <YAxis domain={[0, Math.max(2000, ...data.map(d => d.intakeMl))]} />
              <Tooltip formatter={(value) => `${value} ml`} />
              <ReferenceLine y={2000} stroke="#0070f3" strokeDasharray="3 3" label={{ value: 'Goal: 2,000ml', position: 'top', fill: '#0070f3', fontSize: 14 }} />
              <Bar dataKey="intakeMl" fill="#4fc3f7" radius={[4, 4, 0, 0]}>
                {
                  data.map((entry, index) => (
                    <text
                      key={entry.date}
                      x={index * 100 + 40}
                      y={200 - (entry.intakeMl / Math.max(2000, ...data.map(d => d.intakeMl)) * 180) - 10}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#0070f3"
                    >
                      {entry.percentageOfGoal * 100}%
                    </text>
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SummaryPage;
