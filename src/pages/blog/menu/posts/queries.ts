import API from "../../../../api/global";
import { useQuery } from "react-query";
import { TUseGetPostsAndDraftsQuery, TUseGetPostsQuery } from "./types";

export const useGetPostsQuery: TUseGetPostsQuery = (options = {}, dependencies = []) => {
  return useQuery({
    queryKey: ['API/Posts/getPosts', ...dependencies],
    queryFn: API.Posts.getPosts,
    ...options
  })
};

export const useGetDraftsQuery: TUseGetPostsQuery = (options = {}, dependencies = []) => {
  return useQuery({
    queryKey: ['API/Posts/getDrafts', ...dependencies],
    queryFn: API.Posts.getDrafts,
    ...options
  })
}

export const useGetPostsOrDraftsQuery: TUseGetPostsAndDraftsQuery = (isDraft, options = {}, dependencies = []) => {
  return isDraft ? useGetDraftsQuery(options, dependencies) : useGetPostsQuery(options, dependencies);
}