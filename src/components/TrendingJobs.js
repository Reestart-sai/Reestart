// src/components/TrendingJobs.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import jobsData from '../data/jobs.json'; // Import local jobs.json
import '../styles/TrendingJobs.css'; // Adjust the path as needed

const TrendingJobs = () => {
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to process and cache jobs data
  const processJobsData = () => {
    try {
      // Process the fetched jobs data
      const privateJobs = jobsData
        .filter((job) => job.category === 'Private Job')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 private jobs

      const governmentJobs = jobsData
        .filter((job) => job.category === 'Government Job')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 government jobs

      const internships = jobsData
        .filter((job) => job.category === 'Internship')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 internships

      const abroadJobs = jobsData
        .filter((job) => job.category === 'Abroad Job')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 abroad jobs

      const combinedJobs = [...privateJobs, ...governmentJobs, ...internships, ...abroadJobs];
      
      // Store fetched jobs in local storage
      localStorage.setItem('trendingJobs', JSON.stringify(combinedJobs));
      setTrendingJobs(combinedJobs);
    } catch (error) {
      console.error('Error processing jobs data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if jobs are cached in local storage
  const getCachedJobs = () => {
    const cachedJobs = localStorage.getItem('trendingJobs');
    if (cachedJobs) {
      setTrendingJobs(JSON.parse(cachedJobs));
      setIsLoading(false); // Set loading to false if cached jobs are found
    }
  };

  useEffect(() => {
    getCachedJobs(); // Check for cached jobs on component mount
    processJobsData(); // Process jobs data from the local file
  }, []); // Empty dependency array means this runs once on mount

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  };

  // Function to navigate to job details
  const handleViewDetails = (id) => {
    navigate(`/job-details/${id}`);
  };

  if (isLoading) return <div>Loading trending jobs...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="trending-jobs">
      <h2>Trending Jobs</h2>
      <Slider {...settings}>
        {trendingJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <img src={job.companyImage} alt={job.companyName} className="company-image" />
            <h4>{job.companyName}</h4>
            <p>{job.jobRole}</p>
            <p>{job.experience}</p>
            <p>Posted on: {job.postDate}</p>
            <p>{job.qualification}</p>
            {job.vacancy && (
               <p>
                  <strong>Job Vacancy:</strong> {job.vacancy}
               </p>
            )}
            <button 
              className="view-details" 
              onClick={() => handleViewDetails(job.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingJobs;
