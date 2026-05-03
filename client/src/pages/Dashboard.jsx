import React, {useContext, useEffect, useState} from "react";
import api from "../api/axios";
import {AuthContext} from "../context/AuthContext";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/tasks/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!stats) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* 🔹 Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview</h2>

        {/* 📊 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Tasks" value={stats.total} color="bg-blue-500" />
          <Card title="Todo" value={stats.todo} color="bg-yellow-500" />
          <Card
            title="In Progress"
            value={stats.inProgress}
            color="bg-purple-500"
          />
          <Card title="Completed" value={stats.done} color="bg-green-500" />
          <Card title="Overdue" value={stats.overdue} color="bg-red-500" />
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable Card Component
function Card({title, value, color}) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg text-white ${color} 
      hover:shadow-2xl hover:-translate-y-1 transition duration-300`}
    >
      <h3 className="text-sm opacity-80">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
export default Dashboard;
