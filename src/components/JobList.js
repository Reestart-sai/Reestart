// src/components/JobList.js
/*import React, { useEffect, useState } from 'react';
import JobCardList from './JobCardList'; // Import JobCardList
import { getJobs } from '../api/jobs'; // Import your API function or adjust as necessary

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await getJobs(); // Fetch jobs from your API
        setJobs(fetchedJobs); // Set jobs state
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <JobCardList jobs={jobs} /> {/* Pass jobs to JobCardList */
  //  </div>
 // );
//};

//export default JobList;*/
