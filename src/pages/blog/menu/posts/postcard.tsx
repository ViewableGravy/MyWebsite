import React from "react";
import { useStore } from 'functionality/state/state';
import { TStore } from "functionality/state/types";
import { TPostCardProps } from "./types";
import { Link } from "react-router-dom";
import TagMenu from "../tags-wrapper/tagsWrapper";

const PostsCardsDataFromStore = (store: TStore) => ({
  draftMode: store.draftMode,
})

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

const PublishedCard = ({ updateIndex, title, summary, date, tags }: any) => (
  <div ref={updateIndex} className={"blog-item"}>
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

export const PostsCard = React.forwardRef(({ post, onMouseLeave, onMouseOver, updateIndex }: TPostCardProps, ref: any) => {
  const [{ draftMode }] = useStore(PostsCardsDataFromStore);
  const AddDraftClass = (classes: string) => `${classes} ${draftMode ? 'draft' : ''}`;

  const [title, setTitle] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [date, setDate] = React.useState('');
  const [slug, setSlug] = React.useState('');

  React.useEffect(() => {
    if (post) {
      const { title = '', summary = '', date = '', slug = ''} = post;
      setTitle(title);
      setSummary(summary);
      setDate(date);
      setSlug(slug);
    }
  }, [post])

  //loading
  if (!post) return <LoadingCard />

  if (draftMode) { 
    return (
      <div
        ref={ref}
        className={"post-card-link"}
      >
        <div ref={updateIndex} className={"blog-item draft"}>
          <div className={`title_container`}>
            <textarea className={`title draft`} onChange={e => setTitle(e.target.value)} defaultValue={title} />
            <textarea className={`summary draft`} onChange={e => setSummary(e.target.value)} defaultValue={summary} />
          </div>
          <div className='right-section draft'>
            <textarea className={`date draft`} onChange={e => setDate(e.target.value)} defaultValue={date} />
          </div>
        </div>
      </div>
    )
  }

  const { tags } = post;

  // render normal post
  return (
    <Link 
      to={`/blog/${slug}`}
      ref={ref}
      className={"post-card-link"} 
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <PublishedCard 
        updateIndex={updateIndex} 
        title={title} 
        summary={summary} 
        date={date} 
        tags={tags} 
      />
    </Link>
  )
});