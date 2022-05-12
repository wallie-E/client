import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const { data } = await axios.get('/categories');
      setCats(data);
    }
    getCats();
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">陈锋琪的个人网站</span>
        <img
          src="http://localhost:5000/images/self.jpeg"
          alt=""
        />
      </div>
      {/* <div className="sidebarItem">
        <span className="sidebarTitle">文章分类</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
            <Link to={`/?cat=${cat.name}`} className="link" key={cat._id}>
               <li className="sidebarListItem">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div> */}
      <div className="sidebarItem">
        <span className="sidebarTitle">联系方式</span>
        <div className="sidebarSocial">
            <span className="sidebarIcon iconfont icon-weixin"></span>
            <span className="sidebarIcon iconfont icon-weibo"></span>
            <span className="sidebarIcon iconfont icon-douyin"></span>
        </div>
      </div>
    </div>
  )
}
