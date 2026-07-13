import { RiMoneyDollarCircleLine } from "react-icons/ri";type Job = Record<string, any>;
import { FaClock } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
export default function JobCard({ job }: { job: Job }) {
  return (
   <Link href={`/browsejobs/${job._id}`}>
    <div className="bg-[#111318] border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:border-white/10 transition-colors">
      
      {/* Company Logo */}
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
        {job.companyLogo
          ? <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
          : <span className="text-white text-lg font-bold">{job.companyName?.[0] || '?'}</span>
        }
      </div>

      {/* Job Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-base">{job.title}</h3>
          <button className="text-gray-500 hover:text-white transition-colors shrink-0">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-0.5">
          {job.companyName}
          {(job.city || job.isRemote) && <span> · {job.isRemote ? 'Remote' : `${job.city}, ${job.country}`}</span>}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {job.salaryMin && job.salaryMax && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs">
              <RiMoneyDollarCircleLine /> {job.currency} {Number(job.salaryMin).toLocaleString()} – {Number(job.salaryMax).toLocaleString()}
            </span>
          )}
          {job.type && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs">
              <FaClock /> {job.type}
            </span>
          )}
          {job.deadline && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs">
              <FaCalendarAlt /> {job.deadline}
            </span>
          )}
        </div>
      </div>
    </div>
   </Link>
  );
}