import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Badge, Card, Row, Col, Container } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const categories = [
  { id: 1, name: 'Back-End' },
  { id: 2, name: 'Front-End' },
  { id: 3, name: 'Full-Stack' },
];

const getCategoryColor = (categoryId) => {
  switch (categoryId) {
    case 1:
      return '#30d5c8'; // Back-End
    case 2:
      return '#ffc0cb'; // Front-End
    case 3:
      return '#CBC3E3'; // Full-Stack
    default:
      return '#6c757d'; // Default
  }
};

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
        job.categories.some((categoryId) => categories.find(c => c.id === categoryId)?.name.toLowerCase() === jobCategory.toLowerCase())
      );
      setAllJobs(filteredJobsByCategory);
      setSelectedFilters([jobCategory.toLowerCase()]);

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
  }, [jobs, jobCategory, categories]);

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
      ...new Set([...job.categories.map((categoryId) => categories.find(c => c.id === categoryId)?.name.toLowerCase())]),
    ];
    return selectedFilters.length === 0 || selectedFilters.some((filter) => allFilters.includes(filter));
  });

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
    <Container className="">
      <Row>
        {/* First section: Category buttons */}
        <Col xs={12} sm={12} md={12} className="mb-4">
          <center>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="info" style={{ marginBottom: '1.5rem', padding: '2rem', fontSize: '1.4rem' }}>
                Home
              </Button>
            </Link>
          </center>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((category) => (
              <Badge
                key={category.id}
                pill
                bg={selectedFilters.includes(category.name.toLowerCase()) ? 'warning' : 'secondary'}
                style={{
                  margin: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: selectedFilters.includes(category.name.toLowerCase()) ? 'yellow' : getCategoryColor(category.id),
                  color: selectedFilters.includes(category.name.toLowerCase()) ? 'black' : 'white',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1.2rem',
                  transition: 'background-color 0.3s ease-in-out',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => handleFilterClick(category.name.toLowerCase())}
              >
                {category.name}
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
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Col>
        {/* Third section: Selected job details */}
        <Col xs={12} sm={12} md={12} className="mb-4">
          {selectedJob && (
            <Card style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: jobCardColor, textAlign: 'center', padding: '20px' }}>
              <h2>{selectedJob.title}</h2>
              <p>Company: {selectedJob.company_name}</p>
              <p>Job Type: {selectedJob.job_type}</p>
              <p>
                Categories:{' '}
                {selectedJob.categories.map((categoryId) => categories.find(c => c.id === categoryId)?.name).join(', ')}
              </p>
              <p>Description: {selectedJob.description}</p>
              <p>Salary Range: {selectedJob.salary_range}</p>
              <p>Posted Date: {selectedJob.posted_date}</p>
            </Card>
          )}
        </Col>
        {/* Second section: Job cards */}
        <Col xs={12} sm={12} md={12}>
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
            className="mb-4" // Added padding bottom to the carousel
          >
            {filteredJobs.map((job) => (
              <div key={job.id} style={{ padding: '0 20px' }}>
                <Card
                  style={{
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease-in-out',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backgroundColor: job.categories.length > 0 ? getCategoryColor(job.categories[0]) : '#6c757d',
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
                      {job.categories.map((categoryId) => (
                        <Badge
                          key={categoryId}
                          pill
                          bg={selectedFilters.includes(categories.find(c => c.id === categoryId)?.name.toLowerCase()) ? 'warning' : 'secondary'}
                          style={{
                            margin: '0.25rem',
                            backgroundColor: selectedFilters.includes(categories.find(c => c.id === categoryId)?.name.toLowerCase()) ? 'yellow' : getCategoryColor(categoryId),
                            color: selectedFilters.includes(categories.find(c => c.id === categoryId)?.name.toLowerCase()) ? 'black' : 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {categories.find(c => c.id === categoryId)?.name || 'Unknown'}
                        </Badge>
                      ))}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Jobs;
