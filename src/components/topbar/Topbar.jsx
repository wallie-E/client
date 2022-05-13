import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';
import './topbar.css';


function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://106.14.40.253:5000/images/";
  const handleLogout = () => {
      dispatch({ type: "LOGOUT" })
  }  

  return (
    <div className="top">
        <div className="topLeft">
            <span className="topIcon iconfont icon-weixin"></span>
            <span className="topIcon iconfont icon-weibo"></span>
            <span className="topIcon iconfont icon-douyin"></span>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem"><Link className="link" to="/">主页</Link></li>
                <li className="topListItem"><Link className="link" to="/">关于</Link></li>
                <li className="topListItem"><Link className="link" to="/write">创作</Link></li>
            </ul>
        </div>
        <div className="topRight">
            {
                user ? (
                    <>
                        <Link to="/settings">
                            {user.profilePic ? (
                                <img className="topImg" src={PF+user.profilePic} alt="profile" />
                            ) : (
                                <span className="textAvatar">{user.username[0]}</span>
                            )}
                            
                        </Link>
                    </>
                ) : (
                    <ul className="topList">
                        <li className="topListItem"><Link className="link" to="/login">登录</Link></li>
                        <li className="topListItem"><Link className="link" to="/register">注册</Link></li>
                    </ul>
                )
            }
            <span className="topListItem" onClick={handleLogout}> {user && "退出"} </span>
            {/* <span className="topSearchIcon iconfont icon-sousuo"></span> */}
        </div>
    </div>
  )
}

export default Topbar;
