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
  {/* 🔹 Title & Meta */}
  <title>Reestarts - Latest Government & Private Jobs, Internships & Abroad Careers</title>
  <meta 
    name="description" 
    content="Find the latest Government Jobs, Private Jobs, Abroad Careers, and Internships on Reestarts. Career guidance, job postings, and study resources for freshers & professionals." 
  />
  <meta 
    name="keywords" 
    content="Government Jobs, Private Jobs, Abroad Jobs, Internships, Job Portal, Career Guidance, Reestarts Jobs, Latest Job Updates, reestarts, restarts,Reestarts" 
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.reestarts.in" />

  {/* 🔹 Open Graph (for Facebook, LinkedIn, WhatsApp previews) */}
  <meta property="og:site_name" content="Reestarts" />
  <meta property="og:title" content="Reestarts - Latest Government & Private Jobs" />
  <meta 
    property="og:description" 
    content="Explore Government Jobs, Private Jobs, Abroad Jobs & Internships with Reestarts. Stay updated with career opportunities and career growth tips." 
  />
  <meta property="og:url" content="https://www.reestarts.in" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.reestarts.in/images/logo.png" />

  {/* 🔹 Twitter Card (for X / Twitter shares) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Reestarts - Government & Private Jobs, Internships & Careers" />
  <meta 
    name="twitter:description" 
    content="Find the latest jobs on Reestarts – Government, Private, Abroad, and Internships. Career guidance for freshers & professionals." 
  />
  <meta name="twitter:image" content="https://www.reestarts.in/images/logo.png" />
  <meta name="twitter:site" content="@_Reestarts" />

  {/* 🔹 Organization Schema (helps with Google Rich Snippets) */}
  <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Reestarts",
    "url": "https://www.reestarts.in",
    "logo": "https://www.reestarts.in/images/logo.png",
    "sameAs": [
      "https://x.com/_Reestarts",
      "https://www.instagram.com/reestarts"
    ]
  }
  `}</script>
</Helmet>

      <div className="homepage">
        
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

