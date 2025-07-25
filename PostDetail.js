import { useState, useEffect } from 'react';
import Post from './Post';
import Comment from './Comment';
import PollResults from './PollResults';
import api from '../api/client';

const PostDetail = ({ postUuid, onBack, onUserClick }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [pollResults, setPollResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const postResult = await api.getPost(postUuid);
        setPost(postResult.post);
        setComments(postResult.comments || []);


        if (postResult.post.type === 'poll') {
          try {
            const pollResult = await api.getPollResults(postUuid);
            setPollResults(pollResult);
          } catch (pollError) {
            console.error('Failed to fetch poll results:', pollError);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch post details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (postUuid) {
      fetchPostDetails();
    }
  }, [postUuid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load post</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={onBack} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Post not found</p>
          <button 
            onClick={onBack} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Post</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Main Post */}
        <Post
          post={post}
          onUserClick={onUserClick}
          className="mb-6"
        />

        {/* Poll Results */}
        {post.type === 'poll' && pollResults && (
          <PollResults 
            pollResults={pollResults} 
            className="mb-6"
          />
        )}

        {/* Comments */}
        {comments.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
            </h2>
            <div className="space-y-2">
              {comments.map((comment) => (
                <Comment
                  key={comment.uuid}
                  comment={comment}
                  onUserClick={onUserClick}
                />
              ))}
            </div>
          </div>
        )}

        {comments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No replies yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
