import React from "react";
import { useStore } from 'functionality/state/state';
import { TStore } from "functionality/state/types";
import { TPostsHead } from "./types";
import FlipToggle from "../toggle/toggle";

const PostsHeadDataFromStore = (store: TStore) => ({
  draftMode: store.draftMode,
  token: store.token
})

export const PostsHead: TPostsHead = ({ title }: { title: string }) => {
  const [{ token, draftMode }, dispatch] = useStore(PostsHeadDataFromStore);
  const changeToggle = () => { dispatch({ draftMode: !draftMode })};

  return (
    <div id="posts-head">
      <h1 id="posts-title">{title}</h1>
      { 
        token && <FlipToggle 
          initialState={draftMode} 
          onChange={changeToggle} 
          titleEnabled={"Published"} 
          titleDisabled={"Drafts"} 
        /> 
      }  
    </div>
  )
}