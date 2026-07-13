'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client";
import { getRecruiterJobs } from "@/lib/actions/jobs";
const RecruiterJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();
    const recruiterId = session?.user?.id;

    useEffect(() => {
        if (!recruiterId) return;
        getRecruiterJobs(recruiterId).then(data => {
            setJobs(data);
            setLoading(false);
        });
    }, [recruiterId]);

    if (loading) return (
        <div className="min-h-screen bg-[#131314] flex items-center justify-center">
            <p className="text-gray-400">Loading jobs...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#131314] px-6 py-10">
            <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-white text-2xl font-bold">My Posted Jobs</h1>
                        <p className="text-gray-400 text-sm mt-1">{jobs.length} job{jobs.length !== 1 ? 's' : ''} posted</p>
                    </div>
                    <Link href="/dashboard/recruiter/jobs/new"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#5D54FE] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]">
                        + Post New Job
                    </Link>
                </div>

                {jobs.length === 0 ? (
                    <div className="bg-[#111318] border border-white/5 rounded-2xl p-16 text-center">
                        <p className="text-gray-400 text-sm">No jobs posted yet.</p>
                        <Link href="/dashboard/recruiter/jobs/new"
                            className="inline-block mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors">
                            Post Your First Job
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {jobs.map((job) => (
                            <div key={job._id}
                                className="bg-[#111318] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="text-white font-semibold text-base">{job.title}</h2>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                                        {job.category && <span>{job.category}</span>}
                                        {job.type && <><span className="text-white/20">·</span><span>{job.type}</span></>}
                                        <span className="text-white/20">·</span>
                                        <span>{job.isRemote ? 'Remote' : `${job.city || ''}, ${job.country || ''}`}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                                        {job.salaryMin && job.salaryMax && (
                                            <span>{job.currency} {Number(job.salaryMin).toLocaleString()} – {Number(job.salaryMax).toLocaleString()}</span>
                                        )}
                                        {job.deadline && <><span className="text-white/20">·</span><span>Deadline: {job.deadline}</span></>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                        {job.status || 'active'}
                                    </span>
                                    <button className="px-4 py-2 rounded-xl text-sm text-gray-300 border border-white/10 hover:bg-white/5 transition-colors">
                                        Edit
                                    </button>
                                    <button className="px-4 py-2 rounded-xl text-sm text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterJobsPage;