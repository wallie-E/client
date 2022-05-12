import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  // 根据查询参数来获取posts
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await axios.get('/posts' + search);
      setPosts(data);
    }
    fetchPosts();
  },[search])

  return (
    <>
    <Header/>
    <div className="home">
        <Posts posts={posts}/>
        <Sidebar/>
    </div>
    </>
    
  )
}
