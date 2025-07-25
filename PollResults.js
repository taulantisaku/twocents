import React, { useState, useEffect } from 'react';

const PollResults = ({ pollResults, className = "" }) => {
  const [animatedResults, setAnimatedResults] = useState([]);

  useEffect(() => {
    if (pollResults && pollResults.options) {
      // Calculate total votes
      const totalVotes = pollResults.options.reduce((sum, option) => sum + option.votes, 0);
      
      // Calculate percentages and animate
      const results = pollResults.options.map((option, index) => {
        const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
        return {
          ...option,
          percentage,
          animatedPercentage: 0
        };
      });

      setAnimatedResults(results);

      // Animate the bars
      setTimeout(() => {
        setAnimatedResults(prev => 
          prev.map(option => ({
            ...option,
            animatedPercentage: option.percentage
          }))
        );
      }, 100);
    }
  }, [pollResults]);

  if (!pollResults || !pollResults.options) {
    return null;
  }

  const totalVotes = pollResults.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Poll Results</h3>
      
      <div className="space-y-3">
        {animatedResults.map((option, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{option.text}</span>
              <span className="text-sm text-gray-500">
                {option.votes} {option.votes === 1 ? 'vote' : 'votes'} ({option.percentage.toFixed(1)}%)
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${option.animatedPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Total votes: {totalVotes}
      </div>
    </div>
  );
};

export default PollResults;
