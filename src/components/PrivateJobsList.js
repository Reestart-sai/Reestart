// src/components/PrivateJobsList.js
import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/PrivateJobsList.css';

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const PrivateJobsList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedJobs = JSON.parse(localStorage.getItem('cachedPrivateJobs'));
    const cacheTimestamp = localStorage.getItem('cacheTimestamp');

    if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION) {
      setFilteredJobs(cachedJobs);
      setIsLoading(false);
    } else {
      const privateJobs = jobs.filter((job) => job.category?.toLowerCase() === 'private job');
      const latestPrivateJobs = sortJobsByDate(privateJobs).slice(0, 5);
      setFilteredJobs(latestPrivateJobs);
      setIsLoading(false);

      // Cache the jobs in local storage
      localStorage.setItem('cachedPrivateJobs', JSON.stringify(latestPrivateJobs));
      localStorage.setItem('cacheTimestamp', Date.now());
    }
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
