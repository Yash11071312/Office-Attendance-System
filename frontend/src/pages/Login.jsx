import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../services/api";


import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/employees/login", {
        email,
        password,
      });
localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "employee",
  JSON.stringify(res.data.employee)
);

toast.success("Login Successful!");

if (res.data.employee.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      <form className="login-box" onSubmit={handleLogin}>

        <h1>Office Attendance</h1>

        <div className="input-group">
          <FaEnvelope className="icon" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="icon"/>

          <input
            type={showPassword ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            className="eye"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        <button disabled={loading}>

          {loading ? (
            <div className="loader"></div>
          ) : (
            "Login"
          )}

        </button>

      </form>

    </div>
  );
}

export default Login;