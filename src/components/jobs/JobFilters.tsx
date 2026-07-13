type Props = {
  search: string;
  setSearch: (v: string) => void;
  jobType: string;
  setJobType: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  totalJobs: number;
};

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];

export default function JobFilters({ search, setSearch, jobType, setJobType, sortBy, setSortBy, totalJobs }: Props) {
  return (
    <div className="flex flex-col gap-6">

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#111318] border border-white/10 rounded-xl px-4 py-2.5">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-500 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by job title, keywords..."
            className="bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none w-full"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-[#111318] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
        >
          <option value="recent">Most Recent</option>
          <option value="salary">Highest Salary</option>
        </select>
      </div>

      {/* Results count + Job Type filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-gray-400 text-sm">Found <span className="text-white font-semibold">{totalJobs}</span> Professional Jobs</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setJobType('')}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-colors ${jobType === '' ? 'bg-violet-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          {JOB_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setJobType(type)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-colors ${jobType === type ? 'bg-violet-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}