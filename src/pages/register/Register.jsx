import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './register.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        email,
        password
      })

      data && window.location.replace("/login");
    } catch(err) {
      setError(true);
    }
  }

  return (
    <div className="register">
        <span className="registerTitle">账号注册</span>
        <form className="registerForm" onSubmit={handleSubmit}>
        <label>用户名</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={e => setUsername(e.target.value)}/>
        <label>邮箱</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={e => setEmail(e.target.value)}/>
        <label>密码</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e => setPassword(e.target.value)}/>
        <button className="registerButton">注册</button>
        </form>
        <button className="registerLoginButton" type='submit'>
        <Link className="link" to="/login">登录</Link>
        </button>
        {error && <span style={{color:'red' ,marginTop: '10px'}}>something went wrong!</span>}
    </div>
  )
}
