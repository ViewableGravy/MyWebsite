export type TAPIGetPosts = {
  _id: string,
  title?: string,
  summary?: string,
  date?: string,
  slug: string,
  tags: string[]
}[]

export type TAPIGetDrafts = {
  _id: string,
  title?: string,
  summary?: string,
  date?: string,
  slug: string,
  tags: string[]
}[]

export type TPost = {
  _id: string,
  title: string,
  summary: string,
  date: string,
  tags: string[],
  slug: string,
  dateIsDraft: boolean,
  summaryIsDraft: boolean,
  titleIsDraft: boolean,
}

export type TDraft = {
  _id: string,
  title: string,
  summary: string,
  date: string,
  tags: string[],
  slug: string,
  dateIsDraft: boolean,
  summaryIsDraft: boolean,
  titleIsDraft: boolean,
}

export type TPostCardProps = {
  post?: TPost,
  index?: number,
  updateIndex?: any,
  ref?: any
  onMouseOver?: () => void,
  onMouseLeave?: () => void
};

export type TPostsHead = (props: { title: string }) => JSX.Element;