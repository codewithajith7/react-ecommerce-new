import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "./Register.css"


const Register = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        const data = { username, email, phone, password }

        try {
            let res = await axios.post("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/register", data, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                }
            })
            console.log(res.data)
            alert("register succesfully")
            navigate("/login")



        }
        catch (err) {
            console.log("something went wrong", err)
            alert("register failed")

        }
    }
    return (
        <div className="register-container">
  <div className="register-card">

    <div className="register-left">
      <div className="left-content">
        <h2>Create Your Style</h2>
        <p>
          Join thousands of shoppers and explore premium fashion,
          electronics and lifestyle products.
        </p>
      </div>
    </div>

    <div className="register-right">

      <h1>Create Account</h1>
      <p>Register to start shopping with us.</p>

      <form onSubmit={handleRegister} className="register-form">

        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="tel"
            placeholder="+91 xxxxxxxxxx"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button className="register-btn" type="submit">
          Create Account
        </button>

      </form>

    </div>

  </div>
</div>

    )
}
export default Register