'use client';

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const pieData = [
  { name: 'User', value: 300 },
  { name: 'Admin', value: 100 },
];

const COLORS = ['#8884d8', '#82ca9d'];

export default function PieChartMetric() {
  return (
    <div className="bg-gray-50 p-4 rounded-lg w-full md:w-1/2 h-64">
      <h4 className="text-center text-gray-700 font-medium mb-2">Activity Charts</h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
