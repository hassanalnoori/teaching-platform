import axios from "axios";

const API_URL = "http://teacing-platform-hassan-api.onrnder.com";

// Helper function to get the token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const login = async (fullName, password, code) => {
  const response = await axios.post(`${API_URL}/login`, {
    fullName,
    password,
    code,
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, getAuthHeaders());
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user, getAuthHeaders());
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axios.put(`${API_URL}/users`, user, getAuthHeaders());
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${API_URL}/users/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

export const generateCode = async (role, quantity, stageId, subjectId) => {
  const response = await axios.post(
    `${API_URL}/generate-code`,
    { role, quantity, stageId, subjectId },
    getAuthHeaders()
  );
  return response.data;
};

export const getCodes = async () => {
  const response = await axios.get(`${API_URL}/codes`, getAuthHeaders());
  return response.data;
};

export const deleteCode = async (id) => {
  const response = await axios.delete(
    `${API_URL}/codes/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

export const getStages = async () => {
  const response = await axios.get(`${API_URL}/stages`, getAuthHeaders());
  return response.data;
};

export const getSubjects = async () => {
  const response = await axios.get(`${API_URL}/subjects`, getAuthHeaders());
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await axios.get(`${API_URL}/search-users`, {
    params: { query },
    ...getAuthHeaders(),
  });
  return response.data;
};

export const addStage = async (stage) => {
  const response = await axios.post(
    `${API_URL}/stages`,
    stage,
    getAuthHeaders()
  );
  return response.data;
};

export const addSubject = async (subject) => {
  const response = await axios.post(
    `${API_URL}/subjects`,
    subject,
    getAuthHeaders()
  );
  return response.data;
};

// Add missing functions
export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`, getAuthHeaders());
  return response.data;
};

export const addPost = async (post) => {
  const response = await axios.post(`${API_URL}/posts`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
  return response.data;
};

export const updatePost = async (post) => {
  const response = await axios.put(`${API_URL}/posts`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(
    `${API_URL}/posts/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

export const getPostsByStage = async () => {
  const response = await axios.get(
    `${API_URL}/posts-by-stage`,
    getAuthHeaders()
  );
  return response.data;
};

export const registerUser = async (user) => {
  const response = await axios.post(`${API_URL}/register`, user);
  return response.data;
};
