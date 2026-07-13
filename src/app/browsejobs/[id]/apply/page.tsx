import React, { use } from 'react';
import Applyjobs from './Applyjobs';
import { getJobById } from '@/lib/actions/jobs';
import { getServerSession } from '@/lib/actions/auth-session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getApplicationsBySeeker } from '@/lib/actions/applications';

const FREE_PLAN_LIMIT = 3;

type ApplyPageProps = {
  params: Promise<{ id: string }>;
}
const Applypage = async ({ params }: ApplyPageProps) => {
  const session = await getServerSession();

  const { id } = await params;
  const jobs = await getJobById(id);
  if (!session) {
    redirect(`/sign-in?redirect=/browsejobs/${id}/apply`);
  }

  if (session.user.role !== 'seeker') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-[#111318] border border-white/5 rounded-2xl p-12 max-w-lg text-center flex flex-col items-center gap-5">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-red-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-white text-2xl font-bold">Access Restricted</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Only job seekers can apply for jobs. If you are looking to hire,
              please use your recruiter dashboard instead.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Link href="/browsejobs" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors">
              Browse Jobs
            </Link>
            <Link href="/dashboard/recruiter" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]">
              Go to Dashboard
            </Link>
          </div>

        </div>
      </div>
    );
  }


  const allApplications = await getApplicationsBySeeker(session.user.id);
  const now = new Date();
  const thisMonthApplications = allApplications.filter((app: Record<string, any>) => {
    const appliedAt = new Date(app.appliedAt);
    return (
      appliedAt.getMonth() === now.getMonth() &&
      appliedAt.getFullYear() === now.getFullYear()
    );
  });

  if (thisMonthApplications.length >= FREE_PLAN_LIMIT) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-[#111318] border border-white/5 rounded-2xl p-12 max-w-lg text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-violet-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-2xl font-bold">Application Limit Reached</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              You have used all <span className="text-white font-semibold">{FREE_PLAN_LIMIT} free applications</span> for this month. Upgrade your plan to apply for more jobs.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Link href="/browsejobs" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors">
              Browse Jobs
            </Link>
            <Link href="/pricing" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]">
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Applyjobs job={jobs} userId={session!.user.id} />
    </div>
  );
};

export default Applypage;