/// src/components/AllInternships.js
import React from 'react';
import JobCardList from './JobCardList';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobs.json'; // Import the JSON data directly
import '../styles/AllInternships.css';

// Helper function to sort jobs by post date
const sortJobsByDate = (jobs) => jobs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

const AllInternships = () => {
  // Filter and sort jobs
  const internships = jobsData.filter((job) => job.category?.toLowerCase() === 'internship');
  const sortedJobs = sortJobsByDate(internships);
  const groupedJobs = sortedJobs.reduce((acc, job, index) => {
    const pageIndex = Math.floor(index / 10);
    if (!acc[pageIndex]) acc[pageIndex] = [];
    acc[pageIndex].push(job);
    return acc;
  }, []);

  const [currentPage, setCurrentPage] = React.useState(0);

  const totalPages = groupedJobs.length;

  return (
    <div className="all-internships-section">
      <h2>All Internships</h2>
      <JobCardList jobs={groupedJobs[currentPage] || []} />
      <div className="pagination">
        <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>First</button>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>Next</button>
        <button onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage === totalPages - 1}>Last</button>
      </div>
      <Link to="/" className="back-to-home">Back to Home</Link>
    </div>
  );
};

export default AllInternships;
