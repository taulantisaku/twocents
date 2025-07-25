import React from 'react';
import NetWorthPill from './NetWorthPill';

const Post = ({ post, onClick, onUserClick, className = "" }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const getUserInfo = (user) => {
    const info = [];
    if (user.age) info.push(`${user.age}y`);
    if (user.gender) info.push(user.gender.charAt(0).toUpperCase());
    if (user.location) info.push(user.location);
    return info.join(' • ');
  };

  const handlePostClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  const handleUserClick = (e, userUuid) => {
    e.stopPropagation();
    if (onUserClick) {
      onUserClick(userUuid);
    }
  };

  const renderPostContent = () => {
    switch (post.type) {
      case 'text':
        return (
          <div className="text-white whitespace-pre-wrap">
            {post.content}
          </div>
        );
      case 'poll':
        return (
          <div>
            <div className="text-white mb-3 whitespace-pre-wrap">
              {post.content}
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-sm text-gray-300 mb-2">Poll</div>
              {post.poll_options && post.poll_options.map((option, index) => (
                <div key={index} className="py-1 text-sm text-gray-200">
                  • {option}
                </div>
              ))}
            </div>
          </div>
        );
      case 'image':
        return (
          <div>
            {post.content && (
              <div className="text-gray-900 mb-3 whitespace-pre-wrap">
                {post.content}
              </div>
            )}
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt="Post content" 
                className="rounded-lg max-w-full h-auto"
              />
            )}
          </div>
        );
      default:
        return (
          <div className="text-gray-500 italic">
            Unsupported post type: {post.type}
          </div>
        );
    }
  };

  return (
    <div 
      className={`bg-gray-900 border border-gray-800 rounded-lg p-4 hover:bg-gray-800 cursor-pointer transition-colors ${className}`}
      onClick={handlePostClick}
    >

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <NetWorthPill 
            netWorth={post.user.net_worth} 
            userUuid={post.user.uuid}
            onClick={(userUuid) => handleUserClick(null, userUuid)}
          />
          <div className="text-sm text-gray-400">
            {getUserInfo(post.user)}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {formatTimeAgo(post.created_at)}
        </div>
      </div>


      <div className="mb-3">
        {renderPostContent()}
      </div>


      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          {post.reply_count > 0 && (
            <span>{post.reply_count} {post.reply_count === 1 ? 'reply' : 'replies'}</span>
          )}
          {post.like_count > 0 && (
            <span>{post.like_count} {post.like_count === 1 ? 'like' : 'likes'}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
