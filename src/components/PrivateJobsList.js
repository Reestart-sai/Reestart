// src/components/PrivateJobsList.js
import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/PrivateJobsList.css';

const CACHE_EXPIRATION = 2 * 60 * 1000; // 2 minutes in milliseconds

const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const PrivateJobsList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRefreshCache = () => {
      const cachedJobs = JSON.parse(localStorage.getItem('cachedPrivateJobs'));
      const cacheTimestamp = localStorage.getItem('cacheTimestampPrivateJobs');

      if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION) {
        setFilteredJobs(cachedJobs);
      } else {
        // Refresh cache when expired
        const privateJobs = jobs.filter((job) => job.category?.toLowerCase() === 'private job');
        const latestPrivateJobs = sortJobsByDate(privateJobs).slice(0, 5);
        setFilteredJobs(latestPrivateJobs);

        // Update cache
        localStorage.setItem('cachedPrivateJobs', JSON.stringify(latestPrivateJobs));
        localStorage.setItem('cacheTimestampPrivateJobs', Date.now());
      }
      setIsLoading(false);
    };

    checkAndRefreshCache();

    // Optionally, you can set up an interval to refresh the cache periodically.
    const interval = setInterval(() => checkAndRefreshCache(), CACHE_EXPIRATION);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [jobs]);

  if (isLoading) return <div>Loading private jobs...</div>;

  return (
    <div className="private-jobs-section">
      <h2>Latest Private Jobs</h2>
      <JobCardList jobs={filteredJobs} />
      <Link to="/all-private-jobs" className="see-more-button">See More</Link>
    </div>
  );
};

export default PrivateJobsList;
