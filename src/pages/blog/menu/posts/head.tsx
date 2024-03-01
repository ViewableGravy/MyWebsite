import React from "react";
import { useStore } from 'functionality/state/state';
import { TStore } from "functionality/state/types";
import { FlipToggle } from "../toggle/toggle";
import Text from "components/text";

type TPostsHead = React.FC<{
  title: string,
  showToggle?: boolean
}>;

export const PostsHead: TPostsHead = ({ title, showToggle = true }) => {
  const [{ token, draftMode }, dispatch] = useStore();
  const changeToggle = () => { dispatch({ draftMode: !draftMode })};

  const classes = {
    title: "Posts__title"
  } as const;

  return (
    <div id="posts-head">
      <Text.Heading level={1} white className={classes.title}>{title}</Text.Heading>
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