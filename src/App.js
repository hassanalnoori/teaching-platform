import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import Login from "./components/auth/Login";
import AddAdmin from "./components/forms/AddAdmin";
import PostForm from "./components/forms/PostForm";
import PostList from "./components/lists/PostList";
import EditPost from "./components/forms/EditPost";
import TeacherDashboard from "./components/dashboards/TeacherDashboard";
import StudentDashboard from "./components/dashboards/StudentDashboard";
import RegistrationForm from "./components/auth/RegistrationForm";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<RegistrationForm />} />
        {token && <Route path="/admin" element={<AdminDashboard />} />}
        {token && <Route path="/add-admin" element={<AddAdmin />} />}
        {token && <Route path="/post-form" element={<PostForm />} />}
        {token && <Route path="/post-list" element={<PostList />} />}
        {token && <Route path="/edit-post" element={<EditPost />} />}
        {token && <Route path="/teacher" element={<TeacherDashboard />} />}
        {token && <Route path="/student" element={<StudentDashboard />} />}
      </Routes>
    </Router>
  );
};

export default App;
