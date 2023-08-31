import React, { useEffect, useState } from 'react';
import './hack.css';
import axios from 'axios';

const API_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty';

const Hackernews = () => {
  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  const [totalJobs, setTotalJobs] = useState(0); // Total number of available jobs

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setJobIds(response.data);
        setTotalJobs(response.data.length); // Set the total number of available jobs
      })
      .catch(error => {
        console.error('Error fetching job IDs:', error);
      });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobPromises = jobIds
        .slice(0, loadMore)
        .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));

      try {
        const jobResponses = await Promise.all(jobPromises);
        const jobData = jobResponses.map(response => response.data);
        setJobs(jobData);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobs();
  }, [jobIds, loadMore]);

  const formatIndianDateTime = epochTimestamp => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Kolkata' 
    };
    const date = new Date(epochTimestamp * 1000);
    return date.toLocaleString('en-IN', options);
  };

  const handleMoreData = () => {
    console.log('Button clicked');
    if (loadMore < totalJobs) {
      setLoadMore(prevCount => prevCount + 6);
    }
  };

  
  return (
    <>
      <div className='min-div'>
        <h4 className='main-heading'>hacker news jobs board</h4>

        {jobs.map((job, index) => (
          <div className="center-div" key={index}>
            <h6>{job.title}</h6>
            <h6 className='time'>By: {job.by}, {formatIndianDateTime(job.time)}</h6>
          </div>
        ))}
        <button onClick={handleMoreData} disabled={loadMore >= totalJobs}>load more jobs</button>
      </div>
    </>
  );
};

export default Hackernews;
