import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const sampleData = [
  { month: "Jan", projects: 4 },
  { month: "Feb", projects: 7 },
  { month: "Mar", projects: 5 },
  { month: "Apr", projects: 10 },
  { month: "Mei", projects: 6 },
  { month: "Jun", projects: 12 },
];

const AdminAnalyticsOverview = () => {
  return (
    <section className="bg-[#1a223f] rounded-2xl p-6 shadow-md text-white">
      <h3 className="text-lg font-semibold mb-4">Tren Proyek Masuk (Bulanan)</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#0a142f", border: "none" }} />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#00F2FE"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#4FACFE", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminAnalyticsOverview;