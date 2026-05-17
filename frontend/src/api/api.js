import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const signupAPI = (data) => API.post("/api/auth/signup", data);
export const loginAPI = (data) => API.post("/api/auth/login", data);
export const getMeAPI = () => API.get("/api/auth/me");

// Blog APIs
export const getAllBlogsAPI = (params) => API.get("/api/blogs", { params });
export const getMyBlogsAPI = () => API.get("/api/blogs/my");
export const getBlogByIdAPI = (id) => API.get(`/api/blogs/${id}`);
export const createBlogAPI = (data) => API.post("/api/blogs", data);
export const updateBlogAPI = (id, data) => API.put(`/api/blogs/${id}`, data);
export const deleteBlogAPI = (id) => API.delete(`/api/blogs/${id}`);
export const toggleLikeAPI = (id) => API.put(`/api/blogs/${id}/like`);

// Comment APIs
export const addCommentAPI = (data) => API.post("/api/comments", data);
export const deleteCommentAPI = (id) => API.delete(`/api/comments/${id}`);

export default API;
