import React, { useMemo } from 'react';
import type { Prospect } from '../types';
import { CalendarCheckIcon } from '../components/Icons';

interface DashboardViewProps {
  prospects: Prospect[];
}

const StatCard: React.FC<{ title: string; value: number | string; color: string }> = ({ title, value, color }) => (
  <div className={`rounded-xl shadow-lg p-6 ${color}`}>
    <h5 className="text-sm md:text-base font-semibold opacity-80">{title}</h5>
    <p className="text-3xl md:text-4xl font-bold mt-2">{value}</p>
  </div>
);

export const DashboardView: React.FC<DashboardViewProps> = ({ prospects }) => {
  const { contactedToday, closedThisMonth, totalActive, followUps } = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const thisMonth = today.slice(0, 7);

    const contactedToday = prospects.filter(p => p.lastContactDate === today).length;
    const closedThisMonth = prospects.filter(p => p.status === 'Closed' && p.lastContactDate.startsWith(thisMonth)).length;
    const totalActive = prospects.filter(p => p.status !== 'Closed' && p.status !== 'Cold').length;

    const followUps: { prospect: Prospect, reason: string }[] = [];
    prospects.forEach(p => {
      if (p.status === 'Cold' || p.status === 'Closed') return;

      const lastContact = new Date(p.lastContactDate);
      const diffDays = Math.ceil((new Date().getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays >= 1 && diffDays < 3) {
        followUps.push({ prospect: p, reason: '1st Follow-up (1 day)' });
      } else if (diffDays >= 3 && diffDays < 5) {
        followUps.push({ prospect: p, reason: '2nd Follow-up (3 days)' });
      } else if (diffDays >= 5 && diffDays < 10) {
        followUps.push({ prospect: p, reason: '3rd Follow-up (5 days)' });
      }
    });

    return { contactedToday, closedThisMonth, totalActive, followUps };
  }, [prospects]);

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800">Daily Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Prospects Contacted Today" value={contactedToday} color="bg-brand-purple text-white" />
        <StatCard title="Follow-ups Due Today" value={followUps.length} color="bg-brand-orange text-white" />
        <StatCard title="Deals Closed This Month" value={closedThisMonth} color="bg-green-500 text-white" />
        <StatCard title="Total Active Prospects" value={totalActive} color="bg-gray-200 text-gray-800" />
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-xl font-bold text-gray-800 flex items-center">
            <CalendarCheckIcon />
            <span className="ml-2">Prospects to Follow Up With Today</span>
          </h4>
        </div>
        <div className="p-4">
          {followUps.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {followUps.map(({ prospect, reason }) => (
                <li key={prospect.id} className="py-4 flex items-center justify-between">
                  <div>
                    <strong className="text-gray-900 font-semibold">{prospect.businessName}</strong>
                    <p className="text-sm text-gray-500">{prospect.contactInfo}</p>
                  </div>
                  <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full">{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No follow-ups due today. Great job!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
