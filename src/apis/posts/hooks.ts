// src/apis/posts/hooks.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPost,
  getUserPosts,
  CreatePostPayload,
  GetUserPostsParams,
  PostDTO,
  GetUserPostsResponse
} from './api';

const usePostsQueryClient = () => useQueryClient();

// Create a new post
export const useCreatePost = () => {
  const queryClient = usePostsQueryClient();
  return useMutation<PostDTO, unknown, CreatePostPayload>({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Optional: invalidate or update related queries
      // For example, if you have a feed or user posts list:
      queryClient.invalidateQueries({
        queryKey: ['userPosts', newPost.user_id],
      });
    },
  });
};

// Get posts by user ID with pagination
export const useGetUserPosts = (params: GetUserPostsParams) => {
  const { userId, limit = 5, offset = 0 } = params;
  return useQuery<GetUserPostsResponse>({ // ← specify correct type
    queryKey: ['userPosts', userId, limit, offset],
    queryFn: () => getUserPosts({ userId, limit, offset }),
    enabled: !!userId,
  });
};