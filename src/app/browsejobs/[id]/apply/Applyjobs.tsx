'use client'

import { useState } from 'react';
import { serverMutation } from '@/lib/actions/applications';
import { useRouter } from 'next/navigation';

type ApplyjobsProps = {
  job: Record<string, any>;
  userId: string;
};

const Applyjobs = ({ job, userId }: ApplyjobsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      jobId: job._id,
      jobTitle: job.title,
      companyName: job.companyName,
      recruiterId: job.recruiterId,
      seekerId: userId,
      resumeLink: formData.get('resumeLink') as string,
      coverLetter: formData.get('coverLetter') as string,
      phone: formData.get('phone') as string,
      portfolio: formData.get('portfolio') as string,
      status: 'pending',
      appliedAt: new Date(),
    };

    const result = await serverMutation('http://localhost:5000/applications', 'POST', data);
    setLoading(false);

    if (result.success) {
      alert('Application submitted successfully!');
      router.push('/browsejobs');
    } else {
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="bg-[#111318] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
            {job.companyLogo
              ? <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
              : <span className="text-white text-lg font-bold">{job.companyName?.[0] || '?'}</span>
            }
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">{job.title}</h1>
            <p className="text-gray-400 text-sm">{job.companyName} · {job.isRemote ? 'Remote' : `${job.city}, ${job.country}`}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="bg-[#111318] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="text-white font-semibold text-lg">Your Application</h2>

          {/* Resume Link — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-sm">Resume Link <span className="text-red-400">*</span></label>
            <input
              type="url"
              name="resumeLink"
              required
              placeholder="https://drive.google.com/your-resume"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
            <p className="text-gray-500 text-xs">Link to your resume (Google Drive, Dropbox, etc.)</p>
          </div>

          {/* Cover Letter — optional */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-sm">Cover Letter <span className="text-gray-500">(optional)</span></label>
            <textarea
              name="coverLetter"
              rows={5}
              placeholder="Tell the employer why you're a great fit for this role..."
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
            />
          </div>

          {/* Phone — optional */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-sm">Phone Number <span className="text-gray-500">(optional)</span></label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 234 567 8900"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Portfolio — optional */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-300 text-sm">Portfolio / LinkedIn <span className="text-gray-500">(optional)</span></label>
            <input
              type="url"
              name="portfolio"
              placeholder="https://yourportfolio.com"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Applyjobs;