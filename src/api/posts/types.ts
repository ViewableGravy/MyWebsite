import { TAPITag } from "../../pages/blog/menu/posts/types"

export type TAPIGetPosts = {
  _id: string,
  title?: string,
  summary?: string,
  date?: string,
  slug: string,
  tags: TAPITag[]
}[]

export type TAPIGetDrafts = {
  _id: string,
  title?: string,
  summary?: string,
  date?: string,
  slug: string,
  tags: TAPITag[]
}[]