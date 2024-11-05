// src/components/JobCardList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobCardList.css';

const JobCardList = ({ jobs }) => {
  const navigate = useNavigate();

  const handleJobClick = (id) => {
    navigate(`/job-details/${id}`);
  };

  if (jobs.length === 0) {
    return <p>No jobs found for this category.</p>;
  }

  return (
    <div className="job-card-list">
      {jobs.map((job) => (
        <div 
          key={job.id || `${job.title}-${job.postDate}`} 
          className="job-card" 
          onClick={() => handleJobClick(job.id)} 
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleJobClick(job.id);
            }
          }}
        >
          {job.companyImage ? (
            <img src={job.companyImage} alt={job.companyName} className="company-image" />
          ) : (
            <div className="placeholder-image">No Image Available</div>
          )}
          <h2>{job.companyName}</h2>
          <p>{job.jobRole}</p>
          <p>{job.experience}</p>
          <p>Posted on: {new Date(job.postDate).toLocaleDateString()}</p>
          <span className="view-details-link">View Details</span>
        </div>
      ))}
    </div>
  );
};

export default JobCardList;
