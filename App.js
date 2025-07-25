import React, { useState } from 'react';
import Feed from './components/Feed';
import PostDetail from './components/PostDetail';

function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  const handleBackToFeed = () => {
    setCurrentView('feed');
    setSelectedPost(null);
  };

  const handleUserClick = (userUuid) => {
    // For now, just log the user click
    // In a full implementation, this would navigate to user profile
    console.log('User clicked:', userUuid);
  };

  return (
    <div className="App">
      {currentView === 'feed' && (
        <Feed 
          onPostClick={handlePostClick}
          onUserClick={handleUserClick}
        />
      )}
      
      {currentView === 'post' && selectedPost && (
        <PostDetail 
          postUuid={selectedPost.uuid}
          onBack={handleBackToFeed}
          onUserClick={handleUserClick}
        />
      )}
    </div>
  );
}

export default App;
