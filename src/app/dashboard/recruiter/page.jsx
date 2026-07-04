'use client'
import { authClient } from '@/lib/auth-client';
import { FileText, Person, Thunderbolt, CircleCheckFill } from '@gravity-ui/icons';
import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
const RecruiterPage = () => {
    const {data: session,isPending} = authClient.useSession() 
    if(isPending){
        return <div>Loading...</div>
    }
    const user=session?.user

    const stats = [
    { icon: <FileText className="w-6 h-6" />, label: "Total Job Posts", value: 48 },
    { icon: <Person className="w-6 h-6" />, label: "Total Applicants", value: "1,284" },
    { icon: <Thunderbolt className="w-6 h-6" />, label: "Active Jobs", value: 18 },
    { icon: <CircleCheckFill className="w-6 h-6" />, label: "Jobs Closed", value: 32 },
  ]
    return (
        <div className="min-h-screen bg-[#131314] px-6 py-10">
      <h1 className="text-white text-2xl font-bold mb-8">Welcome back, {user?.name}</h1>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
    );
};

export default RecruiterPage;