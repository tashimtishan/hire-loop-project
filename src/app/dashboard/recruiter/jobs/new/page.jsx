'use client'

import { useState } from 'react';
import { postJob } from "@/lib/actions/jobs";
const NewJobPage = () => {
  const [isRemote, setIsRemote] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  data.isRemote = isRemote;
  console.log(data);

  const result = await postJob(data);
  if (result.success) {
    alert('Job posted successfully!');
    e.target.reset();
  } else {
    alert('Failed to post job. Please try again.');
  };
  }
  return (
    <div className="min-h-screen bg-[#131314] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">Post a New Job</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in the details below to publish a job listing.</p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">

          {/* Section 1 — Job Info */}
          <div className="bg-[#111318] border border-white/5 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-6">Job Info</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Job Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Senior Frontend Developer"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Job Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Job Category</label>
                <select
                  name="category"
                  className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select category</option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Finance</option>
                  <option>HR</option>
                  <option>Product</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Job Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Job Type</label>
                <select
                  name="type"
                  className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Remote</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Salary Min */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Minimum Salary</label>
                <input
                  type="number"
                  name="salaryMin"
                  placeholder="e.g. 50000"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Salary Max */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Maximum Salary</label>
                <input
                  type="number"
                  name="salaryMax"
                  placeholder="e.g. 80000"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Currency</label>
                <select
                  name="currency"
                  className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>BDT</option>
                  <option>INR</option>
                </select>
              </div>

              {/* Remote Toggle */}
              <div className="flex flex-col gap-1.5 justify-center">
                <label className="text-gray-300 text-sm">Remote Position</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRemote(!isRemote)}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 ${isRemote ? 'bg-violet-600' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full mx-1 transition-transform duration-200 ${isRemote ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <span className="text-gray-400 text-sm">{isRemote ? 'Remote' : 'On-site'}</span>
                </div>
              </div>

              {/* Location — only show if not remote */}
              {!isRemote && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-300 text-sm">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Dhaka"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-300 text-sm">Country</label>
                    <input
                      type="text"
                      name="country"
                      placeholder="e.g. Bangladesh"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Section 2 — Job Description */}
          <div className="bg-[#111318] border border-white/5 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-6">Job Description</h2>

            <div className="flex flex-col gap-5">

              {/* Responsibilities */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  rows={5}
                  placeholder="List the key responsibilities for this role..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
                />
              </div>

              {/* Requirements */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Requirements</label>
                <textarea
                  name="requirements"
                  rows={5}
                  placeholder="List the skills and qualifications required..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
                />
              </div>

              {/* Benefits */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">
                  Benefits <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  name="benefits"
                  rows={3}
                  placeholder="e.g. Health insurance, flexible hours, stock options..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
                />
              </div>

            </div>
          </div>

          {/* Section 3 — Company (auto-filled) */}
          <div className="bg-[#111318] border border-white/5 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-lg mb-2">Company</h2>
            <p className="text-gray-400 text-sm mb-5">This will be auto-filled from your registered company.</p>

            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 text-sm">
              Company info will appear here once loaded.
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pb-10">
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]"
            >
              Post Job
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewJobPage;