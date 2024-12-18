// src/components/AbroadJobsList.js
import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/AbroadJobsList.css';

const CACHE_EXPIRATION = 2 * 60 * 1000; // 24 hours in milliseconds

const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const AbroadJobsList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRefreshCache = () => {
      const cachedJobs = JSON.parse(localStorage.getItem('cachedAbroadJobs'));
      const cacheTimestamp = localStorage.getItem('cacheTimestampAbroadJobs');

      if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION) {
        setFilteredJobs(cachedJobs);
      } else {
        // Refresh cache when expired
        const abroadJobs = jobs.filter((job) => job.category?.toLowerCase() === 'abroad job');
        const latestAbroadJobs = sortJobsByDate(abroadJobs).slice(0, 5);
        setFilteredJobs(latestAbroadJobs);

        // Update cache
        localStorage.setItem('cachedAbroadJobs', JSON.stringify(latestAbroadJobs));
        localStorage.setItem('cacheTimestampAbroadJobs', Date.now());
      }
      setIsLoading(false);
    };

    checkAndRefreshCache();

    // Optionally, you can set up an interval to refresh the cache periodically.
    const interval = setInterval(() => checkAndRefreshCache(), CACHE_EXPIRATION);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [jobs]);

  if (isLoading) return <div>Loading abroad jobs...</div>;

  return (
    <div className="abroad-jobs-section">
      <h2>Latest Abroad Jobs</h2>
      <JobCardList jobs={filteredJobs} />
      <Link to="/all-abroad-jobs" className="see-more-button">See More</Link>
    </div>
  );
};

export default AbroadJobsList;
