import { useState } from "react";
import axios from "axios";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";

const Login = ( {updateUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/register?email=eq.${email}&password=eq.${password}`,
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
          },
        }
      );

      console.log(res.data);

      if (res.data.length > 0) {
  const user = res.data[0];

  localStorage.setItem("user", JSON.stringify(user));

  updateUser(user);

  alert("Login Successfully");

  navigate("/");
}
      else {
        alert("Invalid Email or Password");
      }
    } catch (err) {
      console.log("Something went wrong", err);
      alert("Login Failed");
    }
  };

 return (
  <div className="login-container">
    <div className="login-card">

      {/* Left Side */}
      <div className="login-left">
        <h1>Welcome Back!</h1>
        <p>Login to continue shopping your favourite products.</p>

        <form onSubmit={handleLogin} className="login-form">

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

         <p className="register-text">
  Don't have an account?{" "}
  <Link to="/register" className="register-link">
    Register
  </Link>
</p>
        </form>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="overlay">
          <h2>Your Style Awaits</h2>
          <p>
            Discover the latest fashion collections with exclusive offers.
          </p>
        </div>
      </div>

    </div>
  </div>
);
};

export default Login;