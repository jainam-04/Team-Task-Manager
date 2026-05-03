import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

const Tasks = () => {
  const {projectId} = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    deadline: "",
  });
  const [users, setUsers] = useState([]);

  const fetchTasks = async () => {
    try {
      const result = await api.get(`/tasks/project/${projectId}`);
      setTasks(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await api.get("/users");
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", {
        ...form,
        projectId,
      });
      setForm({
        title: "",
        assignedTo: "",
        deadline: "",
      });
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
      console.log(error);
      console.log("projectId: ", projectId, typeof projectId);
      console.log("form: ", form);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, {status});
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {/* 🔹 Create Task */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Create Task</h2>

        <form onSubmit={createTask} className="grid gap-4 sm:grid-cols-4">
          <input
            type="text"
            placeholder="Task Title"
            className="border p-3 rounded-lg"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
          />

          <select
            className="border p-3 rounded-lg"
            value={form.assignedTo}
            onChange={(e) => setForm({...form, assignedTo: e.target.value})}
          >
            <option value="">Select User</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-3 rounded-lg"
            value={form.deadline}
            onChange={(e) => setForm({...form, deadline: e.target.value})}
          />

          <button className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Create
          </button>
        </form>
      </div>

      {/* 🔹 Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{task.title}</h3>

            <p className="text-sm text-gray-500 mt-2">
              Assigned to: {task.assignedTo?.name}
            </p>

            <p className="text-sm mt-1">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded text-white text-sm ${
                  task.status === "todo"
                    ? "bg-yellow-500"
                    : task.status === "in-progress"
                      ? "bg-purple-500"
                      : "bg-green-500"
                }`}
              >
                {task.status}
              </span>
            </p>

            <p className="text-sm mt-1 text-gray-500">
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>

            {/* 🔹 Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => updateStatus(task._id, "todo")}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Todo
              </button>

              <button
                onClick={() => updateStatus(task._id, "in-progress")}
                className="bg-purple-400 px-3 py-1 rounded"
              >
                In Progress
              </button>

              <button
                onClick={() => updateStatus(task._id, "done")}
                className="bg-green-400 px-3 py-1 rounded"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
