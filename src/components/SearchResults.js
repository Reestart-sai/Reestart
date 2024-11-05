import React from 'react';
import JobCardList from './JobCardList';

const SearchResults = ({ jobs }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {jobs.length === 0 ? (
        <p>No jobs found for this search.</p>
      ) : (
        <JobCardList jobs={jobs} />
      )}
    </div>
  );
};

export default SearchResults;
