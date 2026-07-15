'use client'

import { useState } from 'react';

const seekerPlans = [
  {
    name: 'Free',
    id: 'seeker_free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with your job search.',
    features: [
      'Browse & save up to 10 jobs',
      'Apply to up to 3 jobs per month',
      'Basic profile',
      'Email alerts',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    id: 'seeker_pro',
    price: '$19',
    period: 'per month',
    description: 'For active job seekers who need more applications.',
    features: [
      'Apply to up to 30 jobs per month',
      'Unlimited saved jobs',
      'Application tracking',
      'Salary insights',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Premium',
    id: 'seeker_premium',
    price: '$39',
    period: 'per month',
    description: 'Everything you need to land your dream job faster.',
    features: [
      'Everything in Pro',
      'Unlimited applications',
      'Profile boost to recruiters',
      'Early access to new jobs',
      'Priority support',
    ],
    cta: 'Upgrade to Premium',
    highlight: false,
  },
];

const recruiterPlans = [
  {
    name: 'Free',
    id: 'recruiter_free',
    price: '$0',
    period: 'forever',
    description: 'Great for a company\'s first year of hiring.',
    features: [
      'Up to 3 active job posts',
      'Basic applicant management',
      'Standard listing visibility',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    id: 'recruiter_pro',
    price: '$49',
    period: 'per month',
    description: 'For growing teams that need more visibility.',
    features: [
      'Up to 10 active job posts',
      'Applicant tracking',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Upgrade to Growth',
    highlight: true,
  },
  {
    name: 'Enterprise',
    id: 'recruiter_enterprise',
    price: '$149',
    period: 'per month',
    description: 'For large teams with advanced hiring needs.',
    features: [
      'Up to 50 active job posts',
      'Advanced analytics dashboard',
      'Featured job listings',
      'Team collaboration',
      'Custom branding',
      'Priority support',
    ],
    cta: 'Upgrade to Enterprise',
    highlight: false,
  },
];

const faqs = [
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the current billing period.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 7-day money-back guarantee. If you are not satisfied within the first 7 days of your paid plan, contact us for a full refund.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards including Visa, Mastercard, and American Express. We also support payments via Stripe.',
  },
  {
    question: 'Can I switch between plans?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new plan takes effect immediately. When downgrading, changes apply at the start of your next billing cycle.',
  },
  {
    question: 'Is there a difference between Seeker and Recruiter plans?',
    answer: 'Yes. Seeker plans are for job applicants and control how many jobs you can apply to per month. Recruiter plans are for employers and control how many active job posts you can have.',
  },
];

const PlanCard = ({ plan }: { plan: typeof seekerPlans[0] }) => (
  <div className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-200 ${plan.highlight
    ? 'bg-[#1a1025] border-violet-500/50 shadow-[0_0_30px_rgba(109,40,217,0.2)]'
    : 'bg-[#111318] border-white/5'
    }`}>
    {plan.highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="bg-[#6D28D9] text-white text-xs font-semibold px-4 py-1 rounded-full">
          Most Popular
        </span>
      </div>
    )}

    <div className="mb-6">
      <h3 className="text-white font-bold text-lg">{plan.name}</h3>
      <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
    </div>

    <div className="mb-6">
      <span className="text-white text-4xl font-extrabold">{plan.price}</span>
      <span className="text-gray-400 text-sm ml-2">/ {plan.period}</span>
    </div>

    <ul className="flex flex-col gap-3 mb-8 flex-1">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-violet-400 shrink-0 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>

    {plan.name === 'Free' ? (
      <button className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors border border-white/10 text-gray-300 hover:bg-white/5">
        {plan.cta}
      </button>
    ) : (
      <form action="/api/checkout_sessions" method="POST">
        <input type="hidden" name="plan_id" value={plan.id} />
        <button
          type="submit"
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.highlight
            ? 'bg-[#6D28D9] hover:bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(109,40,217,0.35)]'
            : 'border border-white/10 text-gray-300 hover:bg-white/5'
            }`}
        >
          {plan.cta}
        </button>
      </form>
    )}
  </div>
);

const Pricingpage = () => {
  const [tab, setTab] = useState<'seeker' | 'recruiter'>('seeker');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = tab === 'seeker' ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-4xl font-extrabold">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-base max-w-xl">
            Choose the plan that fits your needs. Upgrade or cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center gap-1 bg-[#111318] border border-white/5 rounded-xl p-1 mt-2">
            <button
              onClick={() => setTab('seeker')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'seeker' ? 'bg-[#6D28D9] text-white' : 'text-gray-400 hover:text-white'
                }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setTab('recruiter')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'recruiter' ? 'bg-[#6D28D9] text-white' : 'text-gray-400 hover:text-white'
                }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#111318] border border-white/5 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-white font-medium text-sm">{faq.question}</span>
                <svg
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  className={`text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pricingpage;