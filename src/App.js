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

const CACHE_EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes for testing, adjust as needed

const App = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  // Override viewport meta tag
  useEffect(() => {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]');
    if (viewportMetaTag && window.innerWidth <= 768) {
      viewportMetaTag.setAttribute('content', 'width=1024');
    }
  }, []);

  useEffect(() => {
    const loadJobsWithCache = () => {
      const cachedJobs = localStorage.getItem('cachedJobs');
      const cacheTimestamp = parseInt(localStorage.getItem('cacheTimestamp'), 10);

      if (cachedJobs && cacheTimestamp) {
        const isCacheExpired = Date.now() - cacheTimestamp > CACHE_EXPIRATION_TIME;
        if (!isCacheExpired) {
          setJobs(JSON.parse(cachedJobs));
          return;
        }
      }

      // No valid cache → load from jobsData
      localStorage.setItem('cachedJobs', JSON.stringify(jobsData));
      localStorage.setItem('cacheTimestamp', Date.now().toString());
      setJobs(jobsData);
    };

    loadJobsWithCache();
    const cacheRefreshInterval = setInterval(loadJobsWithCache, CACHE_EXPIRATION_TIME);
    return () => clearInterval(cacheRefreshInterval);
  }, []);

  // Handle search
  const handleSearch = (query) => {
    if (!query.trim()) return; // avoid empty search

    const cachedSearch = localStorage.getItem(`search_${query}`);
    const cacheTimestamp = parseInt(localStorage.getItem(`searchTimestamp_${query}`), 10);
    const isCacheValid =
      cachedSearch && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION_TIME;

    if (isCacheValid) {
      setSearchResults(JSON.parse(cachedSearch));
    } else {
      const lowerQuery = query.toLowerCase();
      const results = jobs.filter((job) =>
        job?.jobRole?.toLowerCase().includes(lowerQuery) ||
        job?.companyName?.toLowerCase().includes(lowerQuery) ||
        job?.experience?.toLowerCase().includes(lowerQuery) ||
        job?.location?.toLowerCase().includes(lowerQuery) // added location search
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
