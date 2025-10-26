import React, { useState, useEffect } from 'react';
import type { Report } from '../types';
import { JournalCheckIcon, ClockHistoryIcon, SendIcon } from '../components/Icons';

interface ReportViewProps {
  reports: Report[];
  addReport: (report: Omit<Report, 'id'>) => void;
}

const initialFormState: Omit<Report, 'id'> = {
  date: new Date().toISOString().slice(0, 10),
  contacted: 0,
  followUps: 0,
  positive: 0,
  calls: 0,
  closed: 0,
  challenges: '',
  plan: ''
};

export const ReportView: React.FC<ReportViewProps> = ({ reports, addReport }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    // Set date to today when component mounts
    setFormData(prev => ({ ...prev, date: new Date().toISOString().slice(0, 10) }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReport(formData);
    setFormData(initialFormState); // Reset form
    alert('Report submitted successfully!');
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-1">
            <JournalCheckIcon />
            <span className="ml-2">Submit Daily Report</span>
          </h2>
          <p className="text-gray-500 mb-6">Submit before 9:00 PM every night.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="report-date" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" id="report-date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prospects Contacted</label>
                <input type="number" name="contacted" value={formData.contacted} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Follow-ups Made</label>
                <input type="number" name="followUps" value={formData.followUps} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Positive Responses</label>
                <input type="number" name="positive" value={formData.positive} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Calls Scheduled</label>
                <input type="number" name="calls" value={formData.calls} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Closed Deals</label>
                <input type="number" name="closed" value={formData.closed} onChange={handleChange} required className="mt-1 block w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple" />
              </div>
            </div>
            <div>
              <label htmlFor="report-challenges" className="block text-sm font-medium text-gray-700">Challenges Faced Today</label>
              <textarea name="challenges" value={formData.challenges} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"></textarea>
            </div>
            <div>
              <label htmlFor="report-plan" className="block text-sm font-medium text-gray-700">Plan for Tomorrow</label>
              <textarea name="plan" value={formData.plan} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"></textarea>
            </div>
            <button type="submit" className="flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300">
              <SendIcon />
              <span className="ml-2">Submit Report</span>
            </button>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h4 className="text-xl font-bold text-gray-800 flex items-center mb-4">
              <ClockHistoryIcon />
              <span className="ml-2">Recent Reports</span>
            </h4>
            <div className="space-y-3 max-h-[400px] lg:max-h-full overflow-y-auto pr-2">
              {reports.slice(0, 10).map(r => (
                <div key={r.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <h5 className="font-semibold text-gray-900">Report for {r.date}</h5>
                    <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">Deals: {r.closed}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Contacted: {r.contacted} | Follow-ups: {r.followUps}</p>
                  <small className="text-xs text-gray-500 block mt-2">Challenges: {r.challenges || 'N/A'}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
