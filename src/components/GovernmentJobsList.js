import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/GovernmentJobsList.css';

const CACHE_EXPIRATION = 2* 60 * 1000; // 24 hours in milliseconds

const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const GovernmentJobsList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedJobs = JSON.parse(localStorage.getItem('cachedGovernmentJobs'));
    const cacheTimestamp = localStorage.getItem('governmentCacheTimestamp');

    if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION) {
      // Use cached jobs if cache is still valid
      setFilteredJobs(cachedJobs);
      setIsLoading(false);
    } else {
      // Filter and sort jobs
      const governmentJobs = jobs.filter((job) => job.category?.toLowerCase() === 'government job');
      const sortedJobs = sortJobsByDate(governmentJobs);

      // Take only the latest 5 jobs for display
      const latestGovernmentJobs = sortedJobs.slice(0, 5);

      setFilteredJobs(latestGovernmentJobs);
      setIsLoading(false);

      // Cache the jobs in local storage
      localStorage.setItem('cachedGovernmentJobs', JSON.stringify(latestGovernmentJobs));
      localStorage.setItem('governmentCacheTimestamp', Date.now());
    }
  }, [jobs]);

  if (isLoading) return <div>Loading government jobs...</div>;

  return (
    <div className="government-jobs-section">
      <h2>Latest Government Jobs</h2>
      <JobCardList jobs={filteredJobs} />
      <Link to="/all-government-jobs" className="see-more-button">See More</Link>
    </div>
  );
};

export default GovernmentJobsList;
