import axios from "axios";
import { TAPIGetDrafts, TAPIGetPosts } from "./types";

import { TAPITag, TDraft, TPost, TTag } from "../../pages/blog/menu/posts/types"

const server = import.meta.env.VITE_APP_BACKEND_SERVER ?? 'localhost';
const port = import.meta.env.VITE_APP_BACKEND_PORT ?? '3000';
const protocol = import.meta.env.VITE_APP_BACKEND_PROTOCOL ?? 'http';
const api = `${protocol}://${server}:${port}/api`

// --------  API to data ----------- //

const mapResultsToDrafts = (result: TAPIGetDrafts): TDraft[] => result.map((post) => ({ 
  title: 'Enter a new title here',
  summary: 'Enter a new summary here',
  date: 'Jan 01 1800',
  ...post,
  dateIsDraft: true,
  summaryIsDraft: true,
  titleIsDraft: true,
  tags: optionalMapTags(post?.tags),
}));

const mapResultsToPosts = (result: TAPIGetPosts): TPost[] => result.map((post) => ({
  title: 'Title Not found',
  summary: 'Summary not found',
  date: 'Jan 01 1971',
  ...post,
  dateIsDraft: false,
  summaryIsDraft: false,
  titleIsDraft: false,
  tags: optionalMapTags(post?.tags),
}));

// ----------- Helpers ------------- //

const optionalMapTags = (tags: TAPITag[]): TTag[] => {
  if (!tags) return [];

  return tags
    .filter((tag) => tag !== undefined)
    .map((tag) => typeof tag === 'string' ? { name: tag, color: 'rgb(224, 8, 206)' } : tag) as TTag[];
};

// --------  API requests ----------- //

const getDrafts = async () : Promise<TDraft[]> => {
  return axios.get<TAPIGetDrafts>(`${api}/blog/admin/post/drafts`)
    .then(res => mapResultsToDrafts(res.data))
    .catch(err => {
      console.error(err);
      return [];
    });
};

const getPosts = async () : Promise<TPost[]> => {
  return axios.get<TAPIGetPosts>(`${api}/blog/posts`)
    .then(res => mapResultsToPosts(res.data))
    .catch(err => {
      console.error(err);
      return [];
    });
}

export const Posts = {
  getDrafts,
  getPosts,
}

export default Posts;