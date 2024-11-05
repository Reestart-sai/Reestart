// src/components/PrivateJobsList.js
import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import '../styles/PrivateJobsList.css';

// Function to sort jobs by post date
const sortJobsByDate = (jobs) => {
  return jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
};

const PrivateJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jobs from local file or local cache
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const cachedJobs = localStorage.getItem('privateJobs');
        
        if (cachedJobs) {
          // Use cached jobs if they exist
          setJobs(JSON.parse(cachedJobs));
          setIsLoading(false);
        } else {
          // Fetch data from the local jobs.json file
          const response = await import('../data/jobs.json');
          const data = response.default; // Access the default export

          setJobs(data);
          localStorage.setItem('privateJobs', JSON.stringify(data)); // Cache the data
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter and sort 'Private Job' category whenever jobs change
  useEffect(() => {
    const privateJobs = jobs.filter(
      (job) => job.category && job.category.trim().toLowerCase() === 'private job'
    );
    
    // Debugging log to ensure only private jobs are being filtered
    console.log("Filtered Private Jobs:", privateJobs);

    // Show only the latest 5 jobs
    const latestPrivateJobs = sortJobsByDate(privateJobs).slice(0, 5);
    setFilteredJobs(latestPrivateJobs);
  }, [jobs]);

  if (isLoading) {
    return <div>Loading private jobs...</div>;
  }

  return (
    <div className="private-jobs-section">
      <h2>Latest Private Jobs</h2>
      <JobCardList jobs={filteredJobs} />

      <Link to="/all-private-jobs" className="see-more-button">See More</Link>
    </div>
  );
};

export default PrivateJobsList;
