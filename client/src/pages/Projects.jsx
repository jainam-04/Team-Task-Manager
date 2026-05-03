import React, {useEffect, useState} from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const result = await api.get("/projects");
      setProjects(result.data);
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
    fetchProjects();
    fetchUsers();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const memberIds = members.split(",").map((id) => id.trim());
      await api.post("/projects", {
        name,
        members: selectedMembers,
      });
      setName("");
      setMembers("");
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      {/* 🔹 Header */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800 mt-3">Projects</h1>

      {/* 🔹 Create Project */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Create Project</h2>

        <form onSubmit={createProject} className="grid gap-4 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Project Name"
            className="border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            multiple
            className="border p-3 rounded-lg"
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              );
              setSelectedMembers(selected);
            }}
          >
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>

          <button className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Create
          </button>
        </form>
      </div>

      {/* 🔹 Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {project.name}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Members: {project.members.length}
              </p>

              <button
                onClick={() => navigate(`/tasks/${project._id}`)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View Tasks
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
