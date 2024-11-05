const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Path to the jobs.json file
const jobsFilePath = path.join(__dirname, 'src', 'data', 'jobs.json');

// GET all jobs
app.get('/api/jobs', (req, res) => {
    fs.readFile(jobsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading jobs data' });
        }
        res.json(JSON.parse(data));
    });
});

// GET a single job by ID
app.get('/api/jobs/:id', (req, res) => {
    const jobId = req.params.id;
    fs.readFile(jobsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading jobs data' });
        }
        const jobs = JSON.parse(data);
        const job = jobs.find((j) => j.id === jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job);
    });
});

// POST a new job
app.post('/api/jobs', (req, res) => {
    const newJob = req.body;
    fs.readFile(jobsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading jobs data' });
        }
        const jobs = JSON.parse(data);
        jobs.push(newJob);
        fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving new job' });
            }
            res.status(201).json(newJob);
        });
    });
});

// PUT (update) a job
app.put('/api/jobs/:id', (req, res) => {
    const jobId = req.params.id;
    const updatedJob = req.body;
    fs.readFile(jobsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading jobs data' });
        }
        let jobs = JSON.parse(data);
        const jobIndex = jobs.findIndex((j) => j.id === jobId);
        if (jobIndex === -1) {
            return res.status(404).json({ error: 'Job not found' });
        }
        jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
        fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating job' });
            }
            res.json(jobs[jobIndex]);
        });
    });
});

// DELETE a job
app.delete('/api/jobs/:id', (req, res) => {
    const jobId = req.params.id;
    fs.readFile(jobsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading jobs data' });
        }
        let jobs = JSON.parse(data);
        jobs = jobs.filter((j) => j.id !== jobId);
        fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting job' });
            }
            res.status(204).send();
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
