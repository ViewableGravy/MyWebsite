export type TAPITag = string | undefined | {
  name: string,
  color: string,
};

export type TTag = {
  name: string,
  color: string,
}

export type TPost = {
  _id: string,
  title: string,
  summary: string,
  date: string,
  tags: TTag[],
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
  tags: TTag[],
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
  onMouseOver?: (e: any) => void,
  onMouseLeave?: (e: any) => void
};

export type TPostsHead = (props: { title: string }) => JSX.Element;