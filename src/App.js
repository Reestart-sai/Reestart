// src/App.js
import React, { useEffect, useState } from 'react';
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

const CACHE_EXPIRATION_TIME = 6 * 60 * 1000; // 24 hours

const App = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Force specific viewport settings for mobile
  useEffect(() => {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]');
    if (viewportMetaTag && window.innerWidth <= 768) {
      viewportMetaTag.setAttribute('content', 'width=1024');
    }
  }, []);

  // Load jobs with cache
  useEffect(() => {
    const loadJobsWithCache = () => {
      const cachedJobs = localStorage.getItem('cachedJobs');
      const cacheTimestamp = localStorage.getItem('cacheTimestamp');

      if (cachedJobs && cacheTimestamp) {
        const isCacheExpired =
          Date.now() - parseInt(cacheTimestamp, 10) > CACHE_EXPIRATION_TIME;
        if (!isCacheExpired) {
          setJobs(JSON.parse(cachedJobs));
          return;
        }
      }

      // Save fresh jobs to cache
      localStorage.setItem('cachedJobs', JSON.stringify(jobsData));
      localStorage.setItem('cacheTimestamp', Date.now().toString());
      setJobs(jobsData);
    };

    loadJobsWithCache();
    const interval = setInterval(loadJobsWithCache, CACHE_EXPIRATION_TIME);
    return () => clearInterval(interval);
  }, []);

  // Handle search
  const handleSearch = (query) => {
    if (!query.trim()) return;

    const cachedSearch = localStorage.getItem(`search_${query}`);
    const cacheTimestamp = localStorage.getItem(`searchTimestamp_${query}`);
    const isCacheValid =
      cachedSearch &&
      cacheTimestamp &&
      Date.now() - parseInt(cacheTimestamp, 10) < CACHE_EXPIRATION_TIME;

    if (isCacheValid) {
      setSearchResults(JSON.parse(cachedSearch));
    } else {
      // Ensure jobs data is loaded before searching
      const results = (jobs.length ? jobs : jobsData).filter(
        (job) =>
          job.jobRole.toLowerCase().includes(query.toLowerCase()) ||
          job.companyName.toLowerCase().includes(query.toLowerCase()) ||
          job.experience.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(results);

      localStorage.setItem(`search_${query}`, JSON.stringify(results));
      localStorage.setItem(`searchTimestamp_${query}`, Date.now().toString());
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
