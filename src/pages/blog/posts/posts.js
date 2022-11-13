import { useState, useEffect } from "react";
import { useGlobalState } from "../../../functionality/globalState";
import { Link } from "react-router-dom";
import axios from 'axios';
import FlipToggle from "../toggle/toggle";
import TagsWrapper from "../tags-wrapper/tagsWrapper";
import './posts.scss'

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const api = `${protocol}://${server}:${port}/api`

const getPosts = async (setPosts) => {
  try {
    const response = await axios.get(`${api}/blog/posts`);
    setPosts(response.data);
  } catch (error) {
    console.log(error);
  }
}

const getDrafts = async (setPosts) => {
  try {
    const response = await axios.get(`${api}/blog/admin/post/drafts`);
    setPosts(response.data);
  } catch (error) {
    console.log(error);
  }
}

export const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [toggleState, setToggleState] = useState('Published');
  const [state, ] = useGlobalState();

  useEffect(() => {
    toggleState === 'Published' 
      ? getPosts(setPosts) 
      : getDrafts(setPosts);
  }, [toggleState])

  useEffect(() => {
    getPosts(setPosts);
  }, [])

  const changeToggle = () => {
    toggleState === 'Published'
      ? setToggleState('Drafts')
      : setToggleState('Published');
  }

  return (
    <>
      <div id="posts-head">
        <h1 id="posts-title">Posts</h1>
        { state.token && <FlipToggle className="FlipToggle" onChange={changeToggle}/> }  
      </div>

      <ul className="posts">
        { posts && posts.map((post) =>
            <li className='blog-item' key={post._id}>
              <Link to={`/blog/${post.slug}`} className='title_container'>
                <h2 className='title'>{post.title}</h2>
                <p className={'summary'} dangerouslySetInnerHTML={{ __html: post.summary }}></p>
              </Link>
              <div className='right-section'>
                <p className='date'>{post.date}</p>
                <TagsWrapper tagDetails={post.tags}/>
              </div>
            </li>
          )
        }
      </ul>
    </>
  )
}

export default Posts;