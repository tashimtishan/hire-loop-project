'use client'

import { useEffect, useState, useMemo } from 'react';
import { getAllJobs } from '@/lib/actions/jobs';
import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    getAllJobs().then(data => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...jobs];

    if (search) {
      result = result.filter(job =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (jobType) {
      result = result.filter(job => job.type === jobType);
    }

    if (sortBy === 'salary') {
      result.sort((a, b) => Number(b.salaryMax) - Number(a.salaryMax));
    }

    return result;
  }, [jobs, search, jobType, sortBy]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-gray-400">Loading jobs...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <JobFilters
          search={search}
          setSearch={setSearch}
          jobType={jobType}
          setJobType={setJobType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalJobs={filtered.length}
        />
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No jobs found.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}