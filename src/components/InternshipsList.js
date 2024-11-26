// src/components/InternshipsList.js
// src/components/InternshipsList.js
import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/InternshipsList.css';

const CACHE_EXPIRATION = 2 * 60 * 1000; // 24 hours in milliseconds

const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const InternshipsList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRefreshCache = () => {
      const cachedJobs = JSON.parse(localStorage.getItem('cachedInternships'));
      const cacheTimestamp = localStorage.getItem('cacheTimestampInternships');

      if (cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION) {
        setFilteredJobs(cachedJobs);
      } else {
        // Refresh cache when expired
        const internships = jobs.filter((job) => job.category?.toLowerCase() === 'internship');
        const latestInternships = sortJobsByDate(internships).slice(0, 5);
        setFilteredJobs(latestInternships);

        // Update cache
        localStorage.setItem('cachedInternships', JSON.stringify(latestInternships));
        localStorage.setItem('cacheTimestampInternships', Date.now());
      }
      setIsLoading(false);
    };

    checkAndRefreshCache();

    // Optionally, you can set up an interval to refresh the cache periodically.
    const interval = setInterval(() => checkAndRefreshCache(), CACHE_EXPIRATION);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [jobs]);

  if (isLoading) return <div>Loading internships...</div>;

  return (
    <div className="internship-section">
      <h2>Latest Internships</h2>
      <JobCardList jobs={filteredJobs} />
      <Link to="/all-internships" className="see-more-button">See More</Link>
    </div>
  );
};

export default InternshipsList;
