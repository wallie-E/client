import { Link } from 'react-router-dom';
import './post.css';

export default function post({post}) { 
  const PF = "http://106.14.40.253:5000/images/";

  return (
    <div className="post">
    { post.photo && (<img
      className="postImg"
      src={PF + post.photo}
      alt=""
    />)}
    <div className="postInfo">
      <div className="postCats">
        {post.categories.map((cat) => (
            <span className="postCat">
               {cat.name}
            </span>
        ))}
      </div>
      <span className="postTitle">
        <Link  className='link' to={`/post/${post._id}`}>
          {post.title}
        </Link>
      </span>
      <hr />
      <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
    </div>
    <p className="postDesc">
      {post.desc}
    </p>
  </div>
  )
}
