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
  { name: 'User', value: 1 },
  { name: 'Books', value: 12 },
];

const COLORS = ['#8884d8', '#82ca9d'];

export default function Piechart() {
  return (
<div>
<h4 className="text-center text-gray-700 font-medium mb-2">Activity Charts</h4>
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
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
    </div>
  );
}
