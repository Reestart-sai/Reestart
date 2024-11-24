// src/components/JobDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jobsData from '../data/jobs.json'; // Import the JSON data
import '../styles/JobDetails.css';
import { Link } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchedJob = jobsData.find((job) => job.id === String(id));

    if (fetchedJob) {
      setJob(fetchedJob);
    } else {
      setError(new Error('Job not found'));
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const jobDescription =
    Array.isArray(job.jobDescription) && job.jobDescription.length > 0
      ? job.jobDescription
      : job.description
      ? [job.description]
      : [];

  return (
    <>
      <Helmet>
        <title>{job.companyName} - {job.jobRole} | Restarts</title>
        <meta name="description" content={`Apply for ${job.jobRole} at ${job.companyName}.`} />
        <meta name="keywords" content={`${job.companyName}, ${job.jobRole}, jobs, careers, Restarts`} />
      </Helmet>
      <div className="job-details">
        <h2>{job.companyName}</h2>
        {job.companyImage && <img src={job.companyImage} alt={job.companyName} />}
        <p><strong>Job Role:</strong> {job.jobRole}</p>
        <p><strong>Posted on:</strong> {new Date(job.postDate).toLocaleDateString()}</p>
        <p><strong>Experience:</strong> {job.experience}</p>
        {job.vacancy && (
          <p>
              <strong>Job Vacancy:</strong> {job.vacancy}
          </p>
        )}

        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Qualification:</strong> {job.qualification}</p>
        {job.vacancy && (
          <p>
              <strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || 'No skills listed'}
          </p>
        )}
        
        <div>
          <h3>Job Description:</h3>
          {jobDescription.length > 0 ? (
            <ul>
              {jobDescription.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          ) : (
            <p>No job description available.</p>
          )}
        </div>
        {job.documents && (
          <div>
                <strong>Required Documents:</strong>
              <ul>
                {job.documents.map((document, index) => (
                <li key={index}>{document}</li>
                ))}
              </ul>
          </div>
        )}

        {job.importantDates && (
          <div>
              <strong>Important Dates:</strong>
            <ul>
                {job.importantDates.map((document, index) => (
                <li key={index}>{document}</li>
                ))}
            </ul>
          </div> 
        )}
        {job.applicationFee && (
          <div>
              <strong>Application Fee:</strong>
              <ul>
                {job.applicationFee.map((document, index) => (
                <li key={index}>{document}</li>
                ))}
              </ul>
          </div>   
        )}
        <p>
          <a href={job.jobLink} target="_blank" rel="noopener noreferrer">Apply Here</a>
        </p>
        {job.notification &&(
          <p className="notification">
            <a href={job.notification} target="_blank" rel="noopener noreferrer">
               Notifications PDF
            </a>
          </p>
        )}
        {job.telegramLink && (
          <p>
            <a href={job.telegramLink} target="_blank" rel="noopener noreferrer">Join Telegram for Updates</a>
          </p>
        )}
        <Link to="/" className="back-to-home">Back to Home</Link>
      </div>
    </>
  );
};

export default JobDetails;
