import React, { useState } from 'react';
import { Form, InputGroup, Button, Badge } from 'react-bootstrap';

function Jobs({ jobs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [allJobs, setAllJobs] = useState(jobs);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTechnologyClick = (technology) => {
    if (selectedTechnologies.includes(technology)) {
      setSelectedTechnologies(selectedTechnologies.filter((tech) => tech !== technology));
    } else {
      setSelectedTechnologies([...selectedTechnologies, technology]);
    }
  };

  const handleReset = () => {
    setSelectedTechnologies([]);
    setAllJobs(jobs);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredJobs = allJobs.filter((job) => {
    const searchableFields = [
      job.title.toLowerCase(),
      job.description.toLowerCase(),
      job.company_name.toLowerCase(),
      job.job_type.toLowerCase(),
      job.salary_range.toLowerCase(),
      job.posted_date.toLowerCase(),
      job.category.toLowerCase(),
      job.experience_levels.map((level) => level.name.toLowerCase()).join(' '),
      job.technologies.map((tech) => tech.name.toLowerCase()).join(' '),
    ];

    return (
      searchableFields.some((field) => field.includes(searchTerm.toLowerCase())) &&
      (selectedTechnologies.length === 0 ||
        selectedTechnologies.every((tech) =>
          job.technologies.some((jobTech) => jobTech.name.toLowerCase() === tech.toLowerCase())
        ))
    );
  });

  const allTechnologies = jobs.flatMap((job) => job.technologies.map((tech) => tech.name.toLowerCase()));
  const uniqueTechnologies = [...new Set(allTechnologies)];

  return (
    <div>
      <div className="job-search-box mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <Form style={{ width: '100%', maxWidth: '600px' }}>


          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={handleInputChange}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px 0 0 4px',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                height: '2.5rem',
              }}
            />
            <Button
              variant="primary"
              style={{
                borderRadius: '0 4px 4px 0',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                height: '2.5rem',
              }}
            >
              Search
            </Button>
            <Button
              variant="danger"
              pill
              style={{
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                height: '2.5rem',
                marginLeft: '0.5rem',
              }}
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </InputGroup>
        </Form>
      </div>
      <div className="mb-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {uniqueTechnologies.map((tech) => (
          <Badge
            key={tech}
            pill
            bg={selectedTechnologies.includes(tech) ? 'primary' : 'secondary'}
            style={{ margin: '0.25rem', cursor: 'pointer' }}
            onClick={() => handleTechnologyClick(tech)}
          >
            {tech}
          </Badge>
        ))}
        <Button
          variant="danger"
          style={{
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            height: '2.5rem',
            marginLeft: '0.5rem',
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
            <p>{job.description}</p>
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
            <p>Category: {job.category}</p>
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