import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';
import './login.css';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const { data } = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch(err){
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  return (
    <div className="login">
      <span className="loginTitle">账号登录</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>用户名</label>
        <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef}/>
        <label>密码</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
        <button className="loginButton" type="submit" disabled={isFetching}>登录</button>
      </form>
        <button className="loginRegisterButton" type='submit'>
          <Link className="link" to="/register">注册</Link>
        </button>
    </div>
  )
}
