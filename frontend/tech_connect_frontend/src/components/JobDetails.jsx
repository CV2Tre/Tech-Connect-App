import React from 'react';

function JobDetails({ job }) {
  return (
    <div className="job-details" style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '3px' }}>
      <h3>{job.title}</h3>
      <p>Company: {job.company_name}</p>
      <p>Job Type: {job.job_type}</p>
      <p>Technologies:</p>
      <ul>
        {job.technologies.map((tech) => (
          <li key={tech.id}>{tech.name}</li>
        ))}
      </ul>
      <p>Experience Levels:</p>
      <ul>
        {job.experience_levels.map((level) => (
          <li key={level.id}>{level.name}</li>
        ))}
      </ul>
      <p>Salary Range: {job.salary_range}</p>
      <p>Posted Date: {job.posted_date}</p>
      <p>Categories:</p>
      <ul>
        {job.categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default JobDetails