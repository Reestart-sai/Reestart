// src/components/HomePage.js
import React from 'react';
import TrendingJobs from './TrendingJobs';
import PrivateJobsList from './PrivateJobsList';
import GovernmentJobsList from './GovernmentJobsList';
import InternshipsList from './InternshipsList';
import AbroadJobsList from './AbroadJobsList';
import '../styles/HomePage.css'; // Ensure this path is correct 

const HomePage = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <div>No jobs available at the moment.</div>; // Handle no jobs scenario
  }

  return (
    <div className="homepage">
      
      <TrendingJobs />
      <PrivateJobsList jobs={jobs} />
      <GovernmentJobsList jobs={jobs} />
      <InternshipsList jobs={jobs} />
      <AbroadJobsList jobs={jobs} />
    </div>
  );
};

export default HomePage;
