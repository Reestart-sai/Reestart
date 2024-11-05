import React from 'react';
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
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import jobsData from './data/jobs.json';

const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const App = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  // Load cached jobs data if available and not expired
  React.useEffect(() => {
    const cachedJobs = localStorage.getItem('cachedJobs');
    const cacheTimestamp = localStorage.getItem('cacheTimestamp');
    const isCacheValid =
      cachedJobs && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION_TIME;

    if (isCacheValid) {
      setJobs(JSON.parse(cachedJobs)); // Using setJobs here
    } else {
      // Cache jobs data in local storage and update timestamp
      localStorage.setItem('cachedJobs', JSON.stringify(jobsData));
      localStorage.setItem('cacheTimestamp', Date.now());
      setJobs(jobsData); // Using setJobs here
    }
  }, []); // This effect runs once on component mount

  // Handle search functionality with caching
  const handleSearch = (query) => {
    const cachedSearch = localStorage.getItem(`search_${query}`);
    const cacheTimestamp = localStorage.getItem(`searchTimestamp_${query}`);
    const isCacheValid =
      cachedSearch && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_EXPIRATION_TIME;

    if (isCacheValid) {
      setSearchResults(JSON.parse(cachedSearch)); // Using setSearchResults here
    } else {
      const results = jobs.filter(
        (job) =>
          job.jobRole.toLowerCase().includes(query.toLowerCase()) ||
          job.companyName.toLowerCase().includes(query.toLowerCase()) ||
          job.experience.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results); // Using setSearchResults here

      // Cache the search results and update timestamp
      localStorage.setItem(`search_${query}`, JSON.stringify(results));
      localStorage.setItem(`searchTimestamp_${query}`, Date.now());
    }

    navigate('/search-results'); // Navigating to search results
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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
