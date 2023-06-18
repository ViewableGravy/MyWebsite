import axios from "axios";
import { TAPIGetDrafts, TAPIGetPosts, TDraft, TPost } from "./types";

const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const api = `${protocol}://${server}:${port}/api`


// --------  API to data ----------- //

const mapResultsToDrafts = (result: TAPIGetDrafts): TDraft[] => result.map((post) => ({ 
  title: 'Enter a new title here',
  summary: 'Enter a new summary here',
  date: 'Jan 01 1800',
  dateIsDraft: true,
  summaryIsDraft: true,
  titleIsDraft: true,
  ...post
}));

const mapResultsToPosts = (result: TAPIGetPosts): TPost[] => result.map((post) => ({
  title: 'Title Not found',
  summary: 'Summary not found',
  date: 'Jan 01 1971',
  dateIsDraft: false,
  summaryIsDraft: false,
  titleIsDraft: false,
  ...post
}));

// --------  API requests ----------- //

export const getDrafts = async () : Promise<TDraft[]> => {
  return axios.get<TAPIGetDrafts>(`${api}/blog/admin/post/drafts`)
    .then(res => mapResultsToDrafts(res.data))
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const getPosts = async () : Promise<TPost[]> => {
  return axios.get<TAPIGetPosts>(`${api}/blog/posts`)
    .then(res => mapResultsToPosts(res.data))
    .catch(err => {
      console.error(err);
      return [];
    });
}