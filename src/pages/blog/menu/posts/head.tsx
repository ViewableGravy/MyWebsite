import React from "react";
import { useStore } from 'functionality/state/state';
import { TStore } from "functionality/state/types";
import { FlipToggle } from "../toggle/toggle";

const PostsHeadDataFromStore = (store: TStore) => ({
  draftMode: store.draftMode,
  token: store.token
})

type TPostsHead = React.FC<{
  title: string,
  showToggle?: boolean
}>;

export const PostsHead: TPostsHead = ({ title, showToggle = true }) => {
  const [{ token, draftMode }, dispatch] = useStore(PostsHeadDataFromStore);
  const changeToggle = () => { dispatch({ draftMode: !draftMode })};

  return (
    <div id="posts-head">
      <h1 id="posts-title">{title}</h1>
      { 
        token && showToggle && <FlipToggle 
          initialState={draftMode} 
          onChange={changeToggle} 
          titleEnabled="Published" 
          titleDisabled="Drafts" 
        /> 
      }  
    </div>
  )
}