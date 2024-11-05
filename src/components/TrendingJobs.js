// src/components/TrendingJobs.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import '../styles/TrendingJobs.css'; // Adjust the path as needed

const TrendingJobs = () => {
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch jobs data
  const fetchJobs = async () => {
    const timestamp = Date.now();
    const url = `https://raw.githubusercontent.com/Reestart-sai/job-listings/main/src/data/jobs.json?t=${timestamp}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Process the fetched jobs data
      const privateJobs = data
        .filter((job) => job.category === 'Private Job')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 private jobs

      const governmentJobs = data
        .filter((job) => job.category === 'Government Job')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 government jobs

      const internships = data
        .filter((job) => job.category === 'Internship')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 internships

      const abroadJobs = data
        .filter((job) => job.category === 'Abroad Job')
        .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        .slice(0, 3); // Get top 3 abroad jobs

      const combinedJobs = [...privateJobs, ...governmentJobs, ...internships, ...abroadJobs];
      
      // Store fetched jobs in local storage
      localStorage.setItem('trendingJobs', JSON.stringify(combinedJobs));
      setTrendingJobs(combinedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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
    fetchJobs(); // Fetch jobs data from the API
  }, []);

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
