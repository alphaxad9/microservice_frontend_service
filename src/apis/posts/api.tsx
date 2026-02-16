// src/apis/posts/api.ts

import { AxiosError } from 'axios';
import { refreshToken } from '../user/authentication/Api';
import { postsServiceClient } from '../client';

// Auth header helper
const getAuthHeader = async () => {
  try {
    const { access } = await refreshToken();
    return {
      Authorization: `Bearer ${access}`,
    };
  } catch (err) {
    console.error('Failed to refresh token for posts service auth header');
    throw err;
  }
};

// PostDTO matches the fields returned by your posts service
export interface PostDTO {
  id: string;
  user_id: string;
  title: string;
  content: string;
  community_id: string;
  is_public: boolean;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

export interface CreatePostPayload {
  title: string;
  content: string;
  community_id: string;
  is_public: boolean;
}

// CREATE a new post
export const createPost = async (
  payload: CreatePostPayload
): Promise<PostDTO> => {
  try {
    const headers = await getAuthHeader();

    const response = await postsServiceClient.post<PostDTO>(
      '/posts',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Create post failed:', error.response?.data || error.message);
    }
    throw error;
  }
};

// GET posts by user ID with pagination
export interface GetUserPostsParams {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface GetUserPostsResponse {
  posts: PostDTO[];
  total: number;
  limit: number;
  offset: number;
}

export const getUserPosts = async ({
  userId,
  limit = 5,
  offset = 0,
}: GetUserPostsParams): Promise<GetUserPostsResponse> => {
  try {
    const response = await postsServiceClient.get<GetUserPostsResponse>(
      `/users/${userId}/posts`,
      {
        params: { limit, offset },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Fetch user posts failed:', error.response?.data || error.message);
    }
    throw error;
  }
};