import React from 'react';
import NetWorthPill from './NetWorthPill';

const Comment = ({ comment, onUserClick, depth = 0, className = "" }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - commentTime) / 1000);
    
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

  const handleUserClick = (userUuid) => {
    if (onUserClick) {
      onUserClick(userUuid);
    }
  };

  const indentationClass = depth > 0 ? `ml-${Math.min(depth * 4, 16)}` : '';

  return (
    <div className={`${indentationClass} ${className}`}>
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <NetWorthPill 
              netWorth={comment.user.net_worth} 
              userUuid={comment.user.uuid}
              onClick={handleUserClick}
            />
            <div className="text-sm text-gray-500">
              {getUserInfo(comment.user)}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {formatTimeAgo(comment.created_at)}
          </div>
        </div>

        <div className="text-gray-900 whitespace-pre-wrap">
          {comment.content}
        </div>

        {comment.like_count > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            {comment.like_count} {comment.like_count === 1 ? 'like' : 'likes'}
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.uuid}
              comment={reply}
              onUserClick={onUserClick}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
