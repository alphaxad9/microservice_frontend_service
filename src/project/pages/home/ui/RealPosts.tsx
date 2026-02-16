// src/pages/feed/RealPosts.tsx

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../entities/store';
import { useCreatePost, useGetUserPosts } from '../../../../apis/posts/hooks';
import { CreatePostPayload } from '../../../../apis/posts/api';
import { useAuth } from '../../../../apis/user/authentication/AuthContext';

const RealPosts = () => {
  const darkmode = useSelector((state: RootState) => state.theme.isDark);
  const { myProfile } = useAuth();
  // Replace with actual user ID from auth context or Redux if available
  const mockUserId = '125706e9-d2d1-494a-93b5-a1b29f12c402'; // From your curl example
  const userId = useSelector((state: RootState) => myProfile?.user_id) || mockUserId;

  // Form state for new post
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [communityId] = useState('123e4567-e89b-12d3-a456-426614174000'); // default/community selector later
  const [isPublic, setIsPublic] = useState(true);

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
    const { data, isLoading, error, refetch } = useGetUserPosts({
    userId,
    limit: 10,
    offset: 0,
    });


  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) return;

    const payload: CreatePostPayload = {
      title,
      content,
      community_id: communityId,
      is_public: isPublic,
    };

    createPost(payload, {
      onSuccess: () => {
        // Clear form
        setTitle('');
        setContent('');
        // Optionally refetch to show new post immediately
        refetch();
      },
    });
  };

  const posts = data?.posts || [];
  console.log(data)

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${darkmode ? 'text-light' : 'text-dark'}`}>
          Go Microservices
        </h2>
        <p className={`mt-2 text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time posts from your Go-powered backend
        </p>
      </div>

      {/* Create Post Form */}
      <div
        className={`rounded-xl p-5 shadow-md ${
          darkmode ? 'bg-dark border border-light' : 'bg-white border border-gray-200'
        }`}
      >
        <h3 className={`font-semibold mb-3 ${darkmode ? 'text-light' : 'text-dark'}`}>
          Create a New Post
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border ${
              darkmode
                ? 'bg-gray-800 text-light border-gray-600'
                : 'bg-white text-dark border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 rounded-md border ${
              darkmode
                ? 'bg-gray-800 text-light border-gray-600'
                : 'bg-white text-dark border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <div className="flex items-center justify-between">
            <label className={`flex items-center space-x-2 ${darkmode ? 'text-light' : 'text-dark'}`}>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded"
              />
              <span>Public Post</span>
            </label>
            <button
              onClick={handleCreatePost}
              disabled={isCreating || !title.trim() || !content.trim()}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isCreating || !title.trim() || !content.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : darkmode
                  ? 'bg-indigo-600 text-light hover:bg-indigo-500'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              {isCreating ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <p className={darkmode ? 'text-light' : 'text-dark'}>Loading your posts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">Failed to load posts. Please try again.</p>
        </div>
      )}

      {/* Posts List */}
      {!isLoading && !error && (
        <div className="space-y-5">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className={`rounded-xl p-5 shadow-sm ${
                  darkmode ? 'bg-dark border border-light' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className={`font-bold text-lg ${darkmode ? 'text-light' : 'text-dark'}`}>
                    {post.title}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      post.is_public
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {post.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
                <p className={`mt-2 whitespace-pre-wrap ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {post.content}
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  <span>Community: {post.community_id}</span>
                  <br />
                  <span>
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className={darkmode ? 'text-gray-400' : 'text-gray-500'}>
                No posts yet. Be the first to share something!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RealPosts;