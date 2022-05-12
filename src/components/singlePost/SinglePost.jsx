import { useLocation } from 'react-router';
import { Context } from '../../context/Context'
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './singlePost.css';

export default function SinglePost() {
  const location = useLocation();
  const { user } = useContext(Context);
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  // 编辑
  const [title, setTitie] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get('/posts/' + path);
      setPost(data);
      setTitie(data.title);
      setDesc(data.desc);
    }
    getPost();
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, { data: { username: user.username } });
      window.location.replace("/");
    } catch(err) {

    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, { username: user.username, title, desc });
      setUpdateMode(false);
    } catch(err) {

    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
            <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />
        )}
        {
          updateMode ? <input type="text" value={title} onChange={(e) => setTitie(e.target.value)} className="singlePostTitleInput" autoFocus/> : (
            <h1 className="singlePostTitle">
              {title}
              <div className="singlePostEdit">
                {user?.username === post.username && (
                  <>
                    <span className="singlePostIcon iconfont icon-edit" onClick={()=>setUpdateMode(true)}></span>
                    <span className="singlePostIcon iconfont icon-delete" onClick={handleDelete}></span>
                  </>
                )}
              </div>
            </h1>
          )
        }
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            作者: &nbsp;
            <Link className="link" to={`/?user=${ post.username }`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)}/> : (
          <p className="singlePostDesc">
            {desc}
          </p>
        )}
        {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>更新</button>
        )}
      </div>
    </div>
  )
}
