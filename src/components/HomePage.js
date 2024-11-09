import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import TrendingJobs from './TrendingJobs';
import PrivateJobsList from './PrivateJobsList';
import GovernmentJobsList from './GovernmentJobsList';
import InternshipsList from './InternshipsList';
import AbroadJobsList from './AbroadJobsList';
import jobsData from '../data/jobs.json'; // Import local jobs.json
import '../styles/HomePage.css'; // Ensure this path is correct

const HomePage = () => {
  const [jobs, setJobs] = useState(jobsData); // Initialize with local jobs data

  useEffect(() => {
    // Check if jobs are cached in local storage
    const cachedJobs = localStorage.getItem('allJobs');
    if (cachedJobs) {
      setJobs(JSON.parse(cachedJobs));
    } else {
      localStorage.setItem('allJobs', JSON.stringify(jobsData)); // Cache the jobs in local storage
    }
  }, []); // Runs once on component mount

  if (jobs.length === 0) {
    return <div>No jobs available at the moment.</div>; // Handle no jobs scenario
  }

  return (
    <>
      <Helmet>
        <title>Reestarts - Find Your Dream Job and Career Opportunities</title>
        <meta name="description" content="Discover the latest job listings on Reestarts, including private jobs, government jobs, internships, and abroad opportunities." />
        <meta name="keywords" content="Reestarts, career guidance, job postings, fresher jobs, study materials, interview preparation, career development, latest job updates, tech news, social media for career, job search, professional growth, personal branding" />
      </Helmet>
      <div className="homepage">
        <h1>Welcome to Reestarts</h1>
        <p>Your go-to platform for career guidance, job postings, and social media strategies to advance your career. Explore top job opportunities and resources designed to help you achieve your career goals.</p>
        
        <TrendingJobs />
        <PrivateJobsList jobs={jobs} />
        <GovernmentJobsList jobs={jobs} />
        <InternshipsList jobs={jobs} />
        <AbroadJobsList jobs={jobs} />
      </div>
    </>
  );
};

export default HomePage;
