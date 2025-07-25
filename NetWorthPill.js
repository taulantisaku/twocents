import React from 'react';

const NetWorthPill = ({ netWorth, userUuid, onClick, className = "" }) => {
  const getNetWorthTier = (amount) => {
    if (amount >= 1000000) return 'platinum';
    if (amount >= 100000) return 'gold';
    if (amount >= 10000) return 'silver';
    return 'bronze';
  };

  const formatNetWorth = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const tier = getNetWorthTier(netWorth);
  const formattedAmount = formatNetWorth(netWorth);

  const tierStyles = {
    bronze: 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg',
    silver: 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-900 shadow-lg',
    gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 shadow-lg font-bold',
    platinum: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg font-bold'
  };

  const handleClick = () => {
    if (onClick && userUuid) {
      onClick(userUuid);
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tierStyles[tier]} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={handleClick}
      title={onClick ? 'View user profile' : ''}
    >
      {formattedAmount}
    </span>
  );
};

export default NetWorthPill;
