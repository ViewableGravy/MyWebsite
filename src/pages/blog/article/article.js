import { useParams } from 'react-router-dom'
import { BlogContainer } from '../blog';
import { PostsHead } from '../posts/posts';
import React from 'react';
import Menu from '../menu/menu'
import useAxios from "axios-hooks";
import './article.scss'

export const BlogArticle = () => {
  const { article } = useParams();
  const [{ data }] = useAxios( `https://gravy.cc/api/blog/posts/${article}`);

  console.log(data)
  
  return (
    <BlogContainer>
      <Menu author={'ViewableGravy'}/>
      <BlogArticleMeta post={data} />
      <BlogArticleContent post={data} />
    </BlogContainer>
  )
}

export const BlogArticleMeta = ({ post }) => {
  if ( !post?.title  ) return null;
  if ( !post?.date   ) return null;
  if ( !post?.author ) return null;

  return (
    <div className={"blog-article meta"}>
      <PostsHead title={post?.title}/>
      
      <div className={'blog-article date'}>{post?.date}</div>
      <div className={'blog-article author'}>{post?.author}</div>
      <BlogArticleMetaTags className={'blog-article tags'} post={post} />
    </div>
  )
}

export const BlogArticleMetaTags = ({ post }) => {
  if ( !post?.tags ) return null;

  return (
    <div className={"blog-article meta-tags"}>
      {post?.tags.map((tag) => {
        return <div className={'blog-article meta-tag'} key={`${post._id}-${tag}`}>{tag}</div>
      })}
    </div>
  )
}

export const BlogArticleContent = ({ post }) => {
  if ( !post?.content )        return null;
  if ( !post.content?.length ) return null;

  return (
    <div className={"blog-article content"}>{
      post.content.map((item) => {
        switch (item.type) {
          case 'Paragraph':
            return <p className={'blog-article content paragraph'} key={item._id} dangerouslySetInnerHTML={{ __html: item.text }}></p>
          default:
            return null;
        }
      })
    }</div>
  )
}

export default BlogArticle;



  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/blog/posts/${article}`)
  //     .then((response) => {
  //       if (response.ok)
  //         return response.json();

  //       if (response.status === 404) {
  //         //show 404 page
  //       }

  //       throw new Error(`This is an HTTP error: The status is ${response.status}`)
  //     })
  //     .then(data => setPosts(data))
  //     .catch(err => setPosts(null));
  // }, [])
  
  // return (
  //   <div id="article_container">
  //     <div id="outer">
  //       <div id="background">
  //         <Menu author="ViewableGravy"/>
  //         <ul id="post">
  //         {
  //           posts && posts.map(post => 
  //             <li key={post._id}>
  //               <h2>{post.title}</h2>
  //               <span>Author:</span><a className='author'> {post.author} </a>
  //               <span>Posted:</span><span className='date'> {post.date}</span>
  //               <br/><span>Tags: </span>
  //               {
  //                 post.tags.map((tag, index, arr) => 
  //                   <span>
  //                     <a>{ tag }</a>
  //                     <span>{index + 1 === arr.length ? "" : ", " }</span>
  //                   </span>
  //                 )
  //               }
  //               {
  //                 post?.content && post.content.map(el => 
  //                   <p dangerouslySetInnerHTML={{ __html: el.text }}></p>
  //                 )
  //               }
  //               {
  //                 console.log(post)
  //               }
  //               <p></p>
  //             </li>
  //           )
  //         }
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // )
//}

{/* <h1>Steal the layout from this site: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js</h1>
        <h1>Steal the Z from this site: https://zellwk.com/blog/crud-express-mongodb/</h1>
        <h1>Steal something from this site: https://flaviocopes.com/rest-api-express-mongodb/</h1> */}
