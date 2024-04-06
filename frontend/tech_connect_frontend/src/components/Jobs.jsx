import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Badge, Card, Row, Col, Container } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Jobs({ jobs }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobCategory = searchParams.get('category');

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [allJobs, setAllJobs] = useState(jobs);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (jobCategory) {
      const filteredJobsByCategory = jobs.filter((job) =>
        job.categories.some((category) => category.name.toLowerCase() === jobCategory.toLowerCase())
      );
      setAllJobs(filteredJobsByCategory);
      setSelectedFilters([jobCategory.toLowerCase()]);

      // Set the selected job to the first job in the filtered array
      if (filteredJobsByCategory.length > 0) {
        setSelectedJob(filteredJobsByCategory[0]);
      } else {
        setSelectedJob(null);
      }
    } else {
      setAllJobs(jobs);
      setSelectedFilters([]);
      setSelectedJob(null);
    }
  }, [jobs, jobCategory]);

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
    setSelectedJob(null);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const filteredJobs = allJobs.filter((job) => {
    const allFilters = [
      ...new Set([...job.categories.map((category) => category.name.toLowerCase()), ...job.technologies.map((tech) => tech.name.toLowerCase())]),
    ];
    return selectedFilters.length === 0 || selectedFilters.some((filter) => allFilters.includes(filter));
  });

  const categoryColors = {
    'front-end': '#007AFF',
    'back-end': '#34C759',
    'full-stack': '#FF9500',
  };

  const technologyColors = {
    react: '#007AFF',
    angular: '#34C759',
    vue: '#FF9500',
    python: '#FF2D55',
    java: '#5856D6',
    javascript: '#8E8E93',
  };

  const jobCardColor = '#ADD8E6'; // Light turquoise

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} sm={4} md={4}>
          <div className="mb-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(categoryColors).map(
              (category) =>
                category !== 'data-science' &&
                category !== 'machine-learning' && (
                  <Badge
                    key={category}
                    pill
                    bg={selectedFilters.includes(category.toLowerCase()) ? 'warning' : 'secondary'}
                    style={{
                      margin: '0.5rem',
                      cursor: 'pointer',
                      backgroundColor: selectedFilters.includes(category.toLowerCase()) ? 'yellow' : categoryColors[category],
                      color: selectedFilters.includes(category.toLowerCase()) ? 'black' : 'white',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1.2rem',
                      transition: 'background-color 0.3s ease-in-out',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={() => handleFilterClick(category.toLowerCase())}
                  >
                    {category}
                  </Badge>
                )
            )}
            <Button
              variant="danger"
              style={{
                borderRadius: '4px',
                padding: '0.75rem 1.5rem',
                fontSize: '1.2rem',
                height: '3rem',
                marginLeft: '0.5rem',
                transition: 'background-color 0.3s ease-in-out',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Col>
        <Col xs={12} sm={8} md={8}>
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            ssr={true}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {filteredJobs.map((job) => (
              <div key={job.id} style={{ padding: '0 20px' }}>
                <Card
                  style={{
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease-in-out',
                    ':hover': {
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backgroundColor: job.categories.length > 0 ? categoryColors[job.categories[0].name.toLowerCase()] : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                  onClick={() => handleJobClick(job)}
                >
                  <Card.Body>
                    <h5>{job.title}</h5>
                    <p>Company: {job.company_name}</p>
                    <p>Job Type: {job.job_type}</p>
                    <p>
                      Categories:{' '}
                      {job.categories.map((category) => (
                        <Badge
                          key={category.id}
                          pill
                          bg={selectedFilters.includes(category.name.toLowerCase()) ? 'warning' : 'secondary'}
                          style={{
                            margin: '0.25rem',
                            backgroundColor: selectedFilters.includes(category.name.toLowerCase()) ? 'yellow' : categoryColors[category.name.toLowerCase()] || '#6c757d',
                            color: selectedFilters.includes(category.name.toLowerCase()) ? 'black' : 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </p>
                    <p>
                      Technologies:{' '}
                      {job.technologies.map((tech) => (
                        <Badge
                          key={tech.id}
                          pill
                          bg={selectedFilters.includes(tech.name.toLowerCase()) ? 'warning' : 'secondary'}
                          style={{
                            margin: '0.25rem',
                            backgroundColor: selectedFilters.includes(tech.name.toLowerCase()) ? 'yellow' : technologyColors[tech.name.toLowerCase()] || '#6c757d',
                            color: selectedFilters.includes(tech.name.toLowerCase()) ? 'black' : 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Carousel>
        </Col>
        <Col xs={12} sm={4} md={4}>
          {selectedJob && (
            <Card className="mb-4" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: jobCardColor, textAlign: 'center', padding: '20px' }}>
              <h2>{selectedJob.title}</h2>
              <p>Company: {selectedJob.company_name}</p>
              <p>Job Type: {selectedJob.job_type}</p>
              <p>
                Categories:{' '}
                {selectedJob.categories.map((category) => category.name).join(', ')}
              </p>
              <p>
                Technologies:{' '}
                {selectedJob.technologies.map((tech) => tech.name).join(', ')}
              </p>
              <p>Description: {selectedJob.description}</p>
              <p>Salary Range: {selectedJob.salary_range}</p>
              <p>Posted Date: {selectedJob.posted_date}</p>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Jobs;
