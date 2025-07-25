import React, { useState, useEffect } from 'react';
import Post from './Post';
import api from '../api/client';

const Feed = ({ onPostClick, onUserClick }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const testResult = await api.testMethods();
        console.log('Found working method:', testResult.method);
        setPosts(testResult.result || []);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Failed to load posts</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-600 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">twocents</h1>
          <p className="text-gray-400 text-sm">Anonymous social network where your username is your net worth</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Post
                key={post.uuid}
                post={post}
                onClick={onPostClick}
                onUserClick={onUserClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
