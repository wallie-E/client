import Sidebar from '../../components/sidebar/Sidebar';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios'; 
import './settings.css';

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  
  const PF = "http://106.14.40.253:5000/images/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      password,
      email
    };
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch(err) {}
    }
    try {
      const { data } = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload: data});
    } catch(err){
      dispatch({type:"UPDATE_FAILURE"});
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">更新账号</span>
          {/* <span className="settingsTitleDelete">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>用户头像</label>
          <div className="settingsPP">
            {(user.profilePic || file) ? (
                <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
                />
            ) : (
              <span>{user.username[0]}</span>
            )}
            
            <label htmlFor="fileInput">
              <span className="settingsPPIcon iconfont icon-user"></span>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>用户名</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
          <label>邮箱</label>
          <input type="email" value={email}  onChange={e => setEmail(e.target.value)}/>
          <label>密码</label>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit">
            更新
          </button>
          {success && <span style={{color: "green", textAlign:"center", marginTop:"20px"}}>profile has been updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
