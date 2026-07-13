'use client'

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { registerCompany, getRecruiterCompany, updateCompany } from '@/lib/actions/company';
import Image from 'next/image';

const IMAGEBB_API_KEY = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY!;

const uploadToImageBB = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.data.url;
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  approved: 'bg-green-500/10 text-green-400 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function CompanyPage() {
  const { data: session } = authClient.useSession();
  const recruiterId = session?.user?.id;

  const [company, setCompany] = useState<Record<string, any> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    if (!recruiterId) return;
    getRecruiterCompany(recruiterId).then((data) => {
      if (data.length > 0) setCompany(data[0]);
      setLoading(false);
    });
  }, [recruiterId]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(formData.entries());
    data.recruiterId = recruiterId;

    if (logoFile) {
      const logoUrl = await uploadToImageBB(logoFile);
      data.logo = logoUrl;
    } else if (company?.logo) {
      data.logo = company.logo;
    }

    const result = company
      ? await updateCompany(company._id, data)
      : await registerCompany(data);

    setSubmitting(false);

    if (result.success) {
      alert(company ? 'Company updated!' : 'Company registered! Waiting for admin approval.');
      setShowForm(false);
      getRecruiterCompany(recruiterId!).then((d) => {
        if (d.length > 0) setCompany(d[0]);
      });
    } else {
      alert('Failed. Please try again.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#131314] flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#131314] px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">My Company</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your company profile.</p>
        </div>

        {/* No company yet */}
        {!company && !showForm && (
          <div className="bg-[#111318] border border-white/5 rounded-2xl p-16 text-center">
            <p className="text-white font-semibold text-lg mb-2">No company registered yet</p>
            <p className="text-gray-400 text-sm mb-6">Register your company to start posting jobs on HireLoop.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)]"
            >
              Register Company
            </button>
          </div>
        )}

        {/* Company details */}
        {company && !showForm && (
          <div className="bg-[#111318] border border-white/5 rounded-2xl p-8 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {company.logo && (
                  <Image src={company.logo} alt="logo" width={64} height={64} className="rounded-xl object-cover" />
                )}
                <div>
                  <h2 className="text-white text-xl font-bold">{company.name}</h2>
                  <p className="text-gray-400 text-sm">{company.industry}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${statusColors[company.status] || statusColors.pending}`}>
                {company.status || 'pending'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Website</p>
                <p className="text-white mt-0.5">{company.website || '—'}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="text-white mt-0.5">{company.location || '—'}</p>
              </div>
              <div>
                <p className="text-gray-500">Employee Count</p>
                <p className="text-white mt-0.5">{company.employeeCount || '—'}</p>
              </div>
            </div>

            {company.description && (
              <div>
                <p className="text-gray-500 text-sm">Description</p>
                <p className="text-gray-300 text-sm mt-1 leading-relaxed">{company.description}</p>
              </div>
            )}

            <div>
              <button
                onClick={() => {
                  setShowForm(true);
                  setSubmitting(false);
                  setLogoPreview(null);
                  setLogoFile(null);
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors"
              >
                Edit Company
              </button>
            </div>
          </div>
        )}

        {/* Register / Edit Form */}
        {showForm && (
          <form onSubmit={onSubmit} className="bg-[#111318] border border-white/5 rounded-2xl p-8 flex flex-col gap-5">
            <h2 className="text-white font-semibold text-lg">
              {company ? 'Edit Company' : 'Register New Company'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Company Name</label>
                <input type="text" name="name" defaultValue={company?.name} placeholder="e.g. Acme Corp"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Industry / Category</label>
                <select name="industry" defaultValue={company?.industry}
                  className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors">
                  <option value="">Select industry</option>
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>E-commerce</option>
                  <option>Marketing</option>
                  <option>Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Website URL</label>
                <div className="flex">
                  <span className="bg-white/5 border border-white/10 border-r-0 rounded-l-xl px-3 flex items-center text-gray-500 text-sm">https://</span>
                  <input type="text" name="website" defaultValue={company?.website} placeholder="www.company.com"
                    className="bg-white/5 border border-white/10 rounded-r-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors w-full" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Location</label>
                <input type="text" name="location" defaultValue={company?.location} placeholder="City, Country"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Employee Count Range</label>
                <select name="employeeCount" defaultValue={company?.employeeCount}
                  className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors">
                  <option value="">Select range</option>
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>500+ employees</option>
                </select>
              </div>

              {/* Logo Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-sm">Company Logo</label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-16 h-16 bg-white/5 border border-dashed border-white/10 rounded-xl cursor-pointer hover:border-violet-500 transition-colors">
                    {logoPreview ? (
                      <Image src={logoPreview} alt="preview" width={64} height={64} className="rounded-xl object-cover w-full h-full" />
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    )}
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  </label>
                  <div>
                    <p className="text-white text-sm">Upload image</p>
                    <p className="text-gray-500 text-xs">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-300 text-sm">Brief Description</label>
              <textarea name="description" defaultValue={company?.description} rows={4}
                placeholder="Tell us about your company's mission and culture..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none" />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#7C3AED] transition-colors shadow-[0_0_20px_rgba(109,40,217,0.35)] disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Saving...' : company ? 'Update Company' : 'Register Company'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}