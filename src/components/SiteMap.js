import React from 'react';
import { Link } from 'react-router-dom';

const SiteMap = () => {
    return (
        <div className="sitemap">
            <h2>Sitemap</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/all-private-jobs">All Private Jobs</Link></li>
                <li><Link to="/all-government-jobs">All Government Jobs</Link></li>
                <li><Link to="/all-internships">All Internships</Link></li>
                <li><Link to="/all-abroad-jobs">All Abroad Jobs</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
            </ul>
        </div>
    );
};

export default SiteMap;
