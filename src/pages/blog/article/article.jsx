import { BlogContainer } from '../blog';
import { PostsHead } from '../menu/posts/head';
import { GenerateTag } from '../menu/tags-wrapper/tagsWrapper';
import Menu from '../menu/menu'
import useAxios from "axios-hooks";
import About from '../menu/about/about';
import { Navigate, useParams } from '@tanstack/react-router';
import { QuerySwitch } from 'components/conditionalRender/conditionalRender';
import { Socials } from '../menu/posts/_socials';
import { ConstructComponent } from './components/componentConstructor';
import { router } from 'router';

import './article.scss'

const server = import.meta.env.VITE_APP_BACKEND_SERVER;
const port = import.meta.env.VITE_APP_BACKEND_PORT;
const protocol = import.meta.env.VITE_APP_BACKEND_PROTOCOL;
const url = `${protocol}://${server}:${port}`;


const getYear = () => {
  return new Date().getFullYear();
}

/**
 * Rendered at /blog/:post
 * @see {@link router}
 */
export const BlogArticle = () => {
  const { post } = useParams({ from: '/blog/$post' });
  const [result] = useAxios( `${url}/api/blog/posts/${post}`);
  const onError = <Navigate to='/blog'/>;

  return (
    <QuerySwitch queryData={result} onError={onError}>
      {(post) => (
        <BlogContainer className="BlogArticle">
          <Menu author="ViewableGravy"/>
          <OwnMeta post={post} />
          <OwnContent post={post} />
          <OwnFooter/>
        </BlogContainer>
      )}
    </QuerySwitch>
  )
}

const OwnMeta = (props) => {
  const { title, date, author, tags } = props.post;
  if (!title || !date || !author || !tags) return null;

  return (
    <div className={"BlogArticleMeta"}>
      <PostsHead title={title}/>
      <div className="BlogArticleMeta__dateWrapper">
        <span className={'BlogArticleMeta__date'}>{date}</span>
        <span className={'BlogArticleMeta__separator'}> • </span>
        <OwnReadTime className={'BlogArticleMeta__readTime'} post={props.post} />
      </div>
      <OwnMetaTags className={'BlogArticleMeta__tags'} tags={tags} />
    </div>
  )
}

const OwnReadTime = ({ post, className }) => {
  if (!post?.content) return null;
  if (post.content.some(item => Array.isArray(item.text))) return null;

  const words = post.content.reduce((acc, item) => {
    if (item.type === 'Paragraph') {
      if (Array.isArray(item.children)) return 0;

      return acc + (item.text ?? item.children).split(' ').length;
    } else
      return acc;
  }, 0);

  return (
    <span className={className}>
      {Math.ceil(words / 200)} min read
    </span>
  )
}

const OwnMetaTags = ({ tags, className }) => {
  if (!tags) return null;

  return (
    <div className={className}>
      {tags.map((tag, index) => (
        <GenerateTag 
          key={index} 
          text={tag.name ?? tag} 
          color={tag.color}
          className="BlogArticleMeta__tag"
        />
      ))}
    </div>
  )
}

const OwnContent = ({ post }) => {
  if (!post?.content?.length) return null;

  return (
    <div className="blog-article content">
      {post.content.map(({ type, _id: key, ...props }, index) => (
        <ConstructComponent 
          type={type} 
          props={{ ...props, isFirst: index === 0 || undefined }} 
          key={key} 
        />
      ))}
    </div>
  )
}

const OwnFooter = () => (
  <div className="blog-article footer">
    <About style={{ marginInline: 0 }}/>
    <Socials />
    <p className="blog-article footer copyright">© {getYear()}. All rights reserved. Made by ViewableGravy</p>
  </div>
)

export default BlogArticle;

/**
 * Potential Layout: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js
 * Potential Title: https://zellwk.com/blog/crud-express-mongodb/
 * Other: https://flaviocopes.com/rest-api-express-mongodb/
 */
