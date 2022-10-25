import React, { useState, useEffect } from 'react';
import './article.scss'
import { useNavigate, useParams } from 'react-router-dom'

export const BlogArticle = () => {
  const { article } = useParams();

  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    fetch(`http://localhost:3000/api/blog/posts/${article}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`)
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setPosts(null);
      })
      .finally(() => setLoading(false))
  }, [])
  
  return (
    <div id="article_container">
      <div id="outer">
        <div id="background">
          <div id="menu">
            <div>
              <span>ViewableGravy</span>
              <span>Category: ALL</span>
            </div>
            <div>
              <a>...</a>
              <a href="https://status.gravy.cc/">Uptime</a>
              <a href="https://github.com/ViewableGravy">github</a>
              <a onClick={() => navigate('/')}>Home</a>
            </div>
          </div>
          <ul id="post">
          {
            posts && posts.map(post => 
              <li key={post._id}>
                <h2>{post.title}</h2>
                <span>Author:</span><a className='author'> {post.author} </a>
                <span>Posted:</span><span className='date'> {post.date}</span>
                <br/><span>Tags: </span>
                {
                  post.tags.map((tag, index, arr) => 
                    <span>
                      <a>{ tag }</a>
                      <span>{index + 1 === arr.length ? "" : ", " }</span>
                    </span>
                  )
                }
                {
                  post?.content && post.content.map(el => 
                    <p dangerouslySetInnerHTML={{ __html: el.text }}></p>
                  )
                }
                {
                  console.log(post)
                }
                <p></p>
              </li>
            )
          }
          </ul>
        </div>
      </div>
    </div>
  )
}

{/* <h1>Steal the layout from this site: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js</h1>
        <h1>Steal the Z from this site: https://zellwk.com/blog/crud-express-mongodb/</h1>
        <h1>Steal something from this site: https://flaviocopes.com/rest-api-express-mongodb/</h1> */}

export default BlogArticle;