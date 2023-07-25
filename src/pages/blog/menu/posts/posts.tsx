import React, { useRef } from "react";
import { Hover } from "../../../../components/hover";
import { useStore } from 'functionality/state/state';
import { PostsHead } from "./head";
import { PostsCard } from "./postcard";
import { ConditionalRender } from "../../../../components/conditionalRender";
import { useGetPostsOrDraftsQuery } from "./queries";
import Footer from "./_footer";
import useConditional from "../../../../hooks/useConditional";
import './posts.scss'

export const Posts = () => {
  const [{ draftMode }] = useStore((store) => ({ draftMode: store.draftMode }));
  const { isLoading, data, error } = useGetPostsOrDraftsQuery(draftMode)
  const title = useConditional(draftMode, 'Drafts', 'Posts');

  const listItems = useRef<Element[]>([]);
  
  return (
    <>
      <PostsHead title={title} />
      <div className="posts">
        <Hover onSize={['md', 'lg', 'xl', 'dual-lg', 'dual-xl']}>
          {({ onMouseOver, onMouseLeave }) => (
            <ConditionalRender
              condition={!isLoading || !error}
              onTrue={data?.map((post, index) => (
                <PostsCard
                  key={post._id}
                  post={post}
                  onMouseOver={onMouseOver}
                  onMouseLeave={onMouseLeave}
                  updateIndex={(element: HTMLElement) => listItems.current[index] = element}
                />
              ))}
              onFalse={[...Array(5).keys()].map((_, i) => <PostsCard key={i}/>)}
            />
          )}
        </Hover>
      </div>
      <Footer/>
    </>
  )
}

export default Posts;