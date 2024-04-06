import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';

function Jobs({ jobs }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [allJobs, setAllJobs] = useState(jobs);

  useEffect(() => {
    setAllJobs(jobs);
  }, [jobs]);

  const handleFilterClick = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleReset = () => {
    setSelectedFilters([]);
    setAllJobs(jobs);
  };

  const filteredJobs = allJobs.filter((job) => {
    const allFilters = [...new Set([...job.categories.map((category) => category.name.toLowerCase()), ...job.technologies.map((tech) => tech.name.toLowerCase())])];
    return selectedFilters.length === 0 || selectedFilters.some((filter) => allFilters.includes(filter));
  });

  const allFilters = [...new Set([...jobs.flatMap((job) => job.categories.map((category) => category.name.toLowerCase())), ...jobs.flatMap((job) => job.technologies.map((tech) => tech.name.toLowerCase()))])];
  const uniqueFilters = [...new Set(allFilters)];

  return (
    <div>
      <h3>Showing {filteredJobs.length} results</h3>
      <div className="mb-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {uniqueFilters.map((filter) => (
          <Badge
            key={filter}
            pill
            bg={selectedFilters.includes(filter) ? 'warning' : 'secondary'}
            style={{
              margin: '0.5rem',
              cursor: 'pointer',
              backgroundColor: selectedFilters.includes(filter) ? 'yellow' : '#6c757d',
              color: selectedFilters.includes(filter) ? 'black' : 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1.2rem',
              transition: 'background-color 0.3s ease-in-out',
            }}
            onClick={() => handleFilterClick(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Badge>
        ))}
        <Button
          variant="danger"
          style={{
            borderRadius: '4px',
            padding: '0.75rem 1.5rem',
            fontSize: '1.2rem',
            height: '3rem',
            marginLeft: '0.5rem',
            transition: 'background-color 0.3s ease-in-out',
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <ul>
        {filteredJobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>Company: {job.company_name}</p>
            <p>Job Type: {job.job_type}</p>
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
            <p>Technologies:</p>
            <ul>
              {job.technologies.map((tech) => (
                <li key={tech.id}>{tech.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jobs;
