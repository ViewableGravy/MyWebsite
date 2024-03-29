import { Hover } from "../../../../components/hover";
import { useStore } from 'functionality/state/state';
import { PostsHead } from "./head";
import { PostsCard } from "./postcard";
import { ConditionalRender } from "../../../../components/conditionalRender/turneryRender";
import { useGetPostsOrDraftsQuery } from "./queries";
import { Footer } from "./_footer";
import useConditional from "../../../../hooks/useConditional";
import './posts.scss'

export const Posts = () => {
  const [{ draftMode }] = useStore((store) => ({ draftMode: store.draftMode }));
  const { isLoading, data, error } = useGetPostsOrDraftsQuery(draftMode)
  const title = useConditional(draftMode, 'Drafts', 'Posts');

  const postcards = [...Array(5).keys()].map((_, i) => <PostsCard key={i}/>);
  
  return (
    <>
      <PostsHead title={title} />
      <div className="posts">
        <Hover onSize={['md', 'lg', 'xl', 'dual-lg', 'dual-xl', 'dual-xxl']}>
          {({ onMouseOver, onMouseLeave }) => (
            <ConditionalRender condition={!isLoading && !error} onFalse={postcards}>
              {data?.map((post) => (
                <PostsCard
                  key={post._id}
                  post={post}
                  onMouseOver={onMouseOver}
                  onMouseLeave={onMouseLeave}
                />
              ))}
            </ConditionalRender>
          )}
        </Hover>
      </div>
      <Footer/>
    </>
  )
}

export default Posts;