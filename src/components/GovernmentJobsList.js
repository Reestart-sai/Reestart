import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/GovernmentJobsList.css';

const CACHE_EXPIRATION = 2 * 60 * 1000; // 2 minutes in milliseconds

const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const GovernmentJobsList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRefreshCache = () => {
      const cachedJobs = JSON.parse(localStorage.getItem('cachedGovernmentJobs'));
      const cacheTimestamp = localStorage.getItem('cacheTimestampGovernmentJobs');

      if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION) {
        setFilteredJobs(cachedJobs);
      } else {
        // Refresh cache when expired
        const governmentJobs = jobs.filter((job) => job.category?.toLowerCase() === 'government job');
        const latestGovernmentJobs = sortJobsByDate(governmentJobs).slice(0, 5);
        setFilteredJobs(latestGovernmentJobs);

        // Update cache
        localStorage.setItem('cachedGovernmentJobs', JSON.stringify(latestGovernmentJobs));
        localStorage.setItem('cacheTimestampGovernmentJobs', Date.now());
      }
      setIsLoading(false);
    };

    checkAndRefreshCache();

    // Optionally, you can set up an interval to refresh the cache periodically.
    const interval = setInterval(() => checkAndRefreshCache(), CACHE_EXPIRATION);

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
