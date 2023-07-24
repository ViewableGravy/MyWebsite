import { UseQueryResult } from "react-query";

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
  onMouseOver?: (e: React.MouseEvent<HTMLElement>) => void,
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void
};

export type TUseGetPostsQuery = (options?: object, dependencies?: string[]) => UseQueryResult<TPost[], unknown>;
export type TUseGetDraftsQuery = (options?: object, dependencies?: string[]) => UseQueryResult<TDraft[], unknown>;
export type TUseGetPostsAndDraftsQuery = (isDraft: boolean, options?: object, dependencies?: string[]) => UseQueryResult<TPost[] | TDraft[], unknown>;

export type TPostsHead = (props: { title: string }) => JSX.Element;