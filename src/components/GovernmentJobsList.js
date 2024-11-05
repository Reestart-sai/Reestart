// src/components/GovernmentJobsList.js
import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/GovernmentJobsList.css';

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const GovernmentJobsList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedJobs = JSON.parse(localStorage.getItem('cachedGovernmentJobs'));
    const cacheTimestamp = localStorage.getItem('cacheTimestamp');

    if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION) {
      setFilteredJobs(cachedJobs);
      setIsLoading(false);
    } else {
      const governmentJobs = jobs.filter((job) => job.category?.toLowerCase() === 'government job');
      const latestGovernmentJobs = sortJobsByDate(governmentJobs).slice(0, 5);
      setFilteredJobs(latestGovernmentJobs);
      setIsLoading(false);

      // Cache the jobs in local storage
      localStorage.setItem('cachedPrivateJobs', JSON.stringify(latestGovernmentJobs));
      localStorage.setItem('cacheTimestamp', Date.now());
    }
  }, [jobs]);

  if (isLoading) return <div>Loading government jobs...</div>;

  return (
    <div className="government-jobs-section">
      <h2>Latest Government Jobs</h2>
      <JobCardList jobs={filteredJobs} />
      <Link to="/all-Government-jobs" className="see-more-button">See More</Link>
    </div>
  );
};

export default GovernmentJobsList;
