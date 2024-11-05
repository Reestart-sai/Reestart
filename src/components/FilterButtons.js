import React from 'react';

const FilterButtons = ({ onFilter }) => {
  return (
    <div className="filter-buttons">
      <button onClick={() => onFilter('date')}>Sort by Date</button>
      <button onClick={() => onFilter('recent')}>Recently Posted</button>
    </div>
  );
};

export default FilterButtons;
