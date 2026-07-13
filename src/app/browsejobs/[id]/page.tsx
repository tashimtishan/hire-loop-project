'use client'

import { use, useEffect, useState } from 'react';
import { getJobById } from '@/lib/actions/jobs';
import Link from 'next/link';

type JobDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const JobDetailsPage = ({ params }: JobDetailsPageProps) => {
  const { id } = use(params);
  const [job, setJob] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobById(id).then(data => {
      setJob(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-gray-400">Job not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Header Card */}
        <div className="bg-[#111318] border border-white/5 rounded-2xl p-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
              {job.companyLogo
                ? <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
                : <span className="text-white text-xl font-bold">{job.companyName?.[0] || '?'}</span>
              }
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{job.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-sm">{job.companyName}</span>
                {job.companyStatus === 'approved' && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-green-400 text-xs flex items-center gap-1">
                      ✓ Verified Employer
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </button>
            <Link href={`/browsejobs/${id}/apply`} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]">
              Apply Now
            </Link>
          </div>
        </div>

        {/* Stats Row + Company Overview */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#111318] border border-white/5 rounded-2xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Salary Range</p>
                <p className="text-white text-sm font-medium">
                  {job.currency} {Number(job.salaryMin).toLocaleString()} – {Number(job.salaryMax).toLocaleString()}
                </p>
              </div>
              <div className="bg-[#111318] border border-white/5 rounded-2xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Location</p>
                <p className="text-white text-sm font-medium">
                  {job.isRemote === 'true' || job.isRemote === true ? 'Remote' : `${job.city}, ${job.country}`}
                </p>
              </div>
              <div className="bg-[#111318] border border-white/5 rounded-2xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Job Type</p>
                <p className="text-white text-sm font-medium">{job.type}</p>
              </div>
              <div className="bg-[#111318] border border-white/5 rounded-2xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Deadline</p>
                <p className="text-white text-sm font-medium">{job.deadline}</p>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-[#111318] border border-white/5 rounded-2xl p-6 flex flex-col gap-6">

              {/* Responsibilities */}
              {job.responsibilities && (
                <div>
                  <h2 className="text-white font-semibold text-lg mb-3">Responsibilities</h2>
                  <ul className="flex flex-col gap-2">
                    {job.responsibilities.split('\n').filter(Boolean).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-violet-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && (
                <div>
                  <h2 className="text-white font-semibold text-lg mb-3">Requirements</h2>
                  <ul className="flex flex-col gap-2">
                    {job.requirements.split('\n').filter(Boolean).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-violet-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div>
                  <h2 className="text-white font-semibold text-lg mb-3">Benefits</h2>
                  <ul className="flex flex-col gap-2">
                    {job.benefits.split('\n').filter(Boolean).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-violet-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

          {/* Right Column — Company Overview */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-[#111318] border border-white/5 rounded-2xl p-6 flex flex-col gap-5 sticky top-24">
              <h2 className="text-white font-semibold text-lg">Company Overview</h2>

              {job.companyLogo && (
                <img src={job.companyLogo} alt={job.companyName} className="w-full h-36 object-cover rounded-xl" />
              )}

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase text-xs tracking-wide">Size</span>
                  <span className="text-white">{job.employeeCount || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase text-xs tracking-wide">Industry</span>
                  <span className="text-white">{job.companyIndustry || job.category || '—'}</span>
                </div>
              </div>

              {job.companyWebsite && (
                <a
                  href={`https://${job.companyWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Visit Website →
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;