// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import JobDetails from './components/JobDetails';
import SearchResults from './components/SearchResults';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import AllPrivateJobs from './components/AllPrivateJobs';
import AllGovernmentJobs from './components/AllGovernmentJobs';
import AllInternships from './components/AllInternships';
import AllAbroadJobs from './components/AllAbroadJobs';
import SiteMap from './components/SiteMap';

import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import jobsData from './data/jobs.json';

const CACHE_EXPIRATION_TIME = 2 * 60 * 1000; // 24 hours in milliseconds

const App = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  // Override viewport meta tag to handle zooming and scaling properly
  useEffect(() => {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]');
    
    if (viewportMetaTag) {
      if (window.innerWidth <= 768) {
        // Force desktop view on smaller devices (optional, use with caution)
        viewportMetaTag.setAttribute('content', 'width=1024');
      } 
    }
  }, []);

  useEffect(() => {
    const loadJobsWithCache = () => {
      const cachedJobs = localStorage.getItem('cachedJobs');
      const cacheTimestamp = localStorage.getItem('cacheTimestamp');

      if (cachedJobs && cacheTimestamp) {
        const isCacheExpired = Date.now() - parseInt(cacheTimestamp, 10) > CACHE_EXPIRATION_TIME;

        if (!isCacheExpired) {
          // Use cached data if valid
          setJobs(JSON.parse(cachedJobs));
          return;
        }
      }

      // Cache is invalid or doesn't exist; fetch and cache new data
      localStorage.setItem('cachedJobs', JSON.stringify(jobsData));
      localStorage.setItem('cacheTimestamp', Date.now());
      setJobs(jobsData);
    };

    loadJobsWithCache();

    // Optionally set an interval to refresh the cache automatically
    const cacheRefreshInterval = setInterval(loadJobsWithCache, CACHE_EXPIRATION_TIME);

    return () => clearInterval(cacheRefreshInterval); // Clean up interval
  }, []);
  // Handle search functionality with caching
  const handleSearch = (query) => {
    const cachedSearch = localStorage.getItem(`search_${query}`);
    const cacheTimestamp = localStorage.getItem(`searchTimestamp_${query}`);
    const isCacheValid =
      cachedSearch && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION_TIME;

    if (isCacheValid) {
      setSearchResults(JSON.parse(cachedSearch));
    } else {
      const results = jobs.filter(
        (job) =>
          job.jobRole.toLowerCase().includes(query.toLowerCase()) ||
          job.companyName.toLowerCase().includes(query.toLowerCase()) ||
          job.experience.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);

      // Cache the search results and update timestamp
      localStorage.setItem(`search_${query}`, JSON.stringify(results));
      localStorage.setItem(`searchTimestamp_${query}`, Date.now());
    }

    navigate('/search-results');
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage jobs={jobs} />} />
        <Route path="/all-government-jobs" element={<AllGovernmentJobs jobs={jobs} />} />
        <Route path="/job-details/:id" element={<JobDetails jobs={jobs} />} />
        <Route path="/search-results" element={<SearchResults jobs={searchResults} />} />
        <Route path="/all-internships" element={<AllInternships jobs={jobs} />} />
        <Route path="/all-private-jobs" element={<AllPrivateJobs jobs={jobs} />} />
        <Route path="/all-abroad-jobs" element={<AllAbroadJobs jobs={jobs} />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sitemap.xml" element={<SiteMap />} /> 
      </Routes>
      <Footer />
    </>
  );
};

export default App;
