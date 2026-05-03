import axios from 'axios';

const api = axios.create({
      baseURL: "team-task-manager-production-89fa.up.railway.app/api"
});

api.interceptors.request.use(req => {
      const token = localStorage.getItem("token");
      if (token) {
            req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
});

export default api;