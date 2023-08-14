import React from "react";
import { useStore } from 'functionality/state/state';
import { TStore } from "functionality/state/types";
import { TDraftCardProps, TPostCardProps, TPublishedCardProps } from "./types";
import { Link } from "react-router-dom";
import TagMenu from "../tags-wrapper/tagsWrapper";
import TLink from "components/TLink";

const PostsCardsDataFromStore = (store: TStore) => ({
  draftMode: store.draftMode,
})

export const PostsCard = ({ post, onMouseLeave, onMouseOver }: TPostCardProps) => {
  const [{ draftMode }] = useStore(PostsCardsDataFromStore);

  //loading
  if (!post) 
    return <LoadingCard />

  // draft mode
  if (draftMode) 
    return <DraftCard {...post} />

  // normal post
  return (
    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} >
      <TLink to={`/blog/${post.slug}`} className={"post-card-link"} >
        <PublishedCard {...post} />
      </TLink>
    </div>
  )
};

const LoadingCard = () => (
  <div className={'blog-item loading'}>
    <div className={"left"}>
      <div className={"loading__item"}/>
      <div className={"loading__description"}>
        { [...Array(20).keys()].map((_, i) => <div key={i}/>) }
      </div>
    </div>
    <div className={"right"}>
      <div className={"loading__date"}/>
      <div className={"loading__cards"}/>
    </div>
  </div>
);

const PublishedCard = ({ title, summary, date, tags }: TPublishedCardProps) => (
  <div className={"blog-item"}>
    <div className={`title_container`}>
      <h2 className={`title`}>{title}</h2>
      <p className={`summary`} dangerouslySetInnerHTML={{ __html: summary }}/>
    </div>
    <div className='right-section'>
      <p className={`date`}>{date}</p>
      <TagMenu data={tags} />
    </div>
  </div>
);

const DraftCard = ({ title, summary, date }: TDraftCardProps) => (
  <div className={"post-card-link"} >
    <div className={"blog-item draft"}>
      <div className={`title_container`}>
        <textarea className={`title draft`} defaultValue={title} />
        <textarea className={`summary draft`} defaultValue={summary} />
      </div>
      <div className='right-section draft'>
        <textarea className={`date draft`} defaultValue={date} />
      </div>
    </div>
  </div>
);