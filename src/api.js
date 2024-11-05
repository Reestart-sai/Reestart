// src/api.js
const API_URL = "https://jsonplaceholder.typicode.com"; // Replace with your API endpoint

// Fetch all jobs
export const getJobs = async () => {
  const response = await fetch(`${API_URL}/jobs`); // Replace '/jobs' with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return await response.json();
};

// Add a new job
export const addJob = async (jobData) => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error("Failed to add job");
  }
  return await response.json();
};

// Update a job
export const updateJob = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Failed to update job");
  }
  return await response.json();
};

// Delete a job
export const deleteJob = async (id) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
};
