import React, { useState, useEffect } from 'react';
import type { Prospect } from '../types';
import { ProspectStatus } from '../types';

interface ProspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prospect: Prospect) => void;
  prospect: Prospect | null;
}

const initialFormState: Omit<Prospect, 'id'> = {
  businessName: '',
  contactPerson: '',
  contactInfo: '',
  status: ProspectStatus.PROSPECTING,
  lastContactDate: new Date().toISOString().slice(0, 10),
  notes: ''
};

export const ProspectModal: React.FC<ProspectModalProps> = ({ isOpen, onClose, onSave, prospect }) => {
  const [formData, setFormData] = useState<Omit<Prospect, 'id'>>(initialFormState);

  useEffect(() => {
    if (prospect) {
      setFormData(prospect);
    } else {
      setFormData(initialFormState);
    }
  }, [prospect, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: prospect?.id || '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-fade-in-up">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{prospect ? 'Edit Prospect' : 'Add New Prospect'}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">Business Name</label>
              <input type="text" id="business-name" name="businessName" value={formData.businessName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"/>
            </div>
            <div>
              <label htmlFor="contact-person" className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input type="text" id="contact-person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"/>
            </div>
            <div>
              <label htmlFor="contact-info" className="block text-sm font-medium text-gray-700">Contact Info (Phone/Email/Social)</label>
              <input type="text" id="contact-info" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"/>
            </div>
            <div>
              <label htmlFor="prospect-status" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="prospect-status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple">
                {Object.values(ProspectStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="last-contact-date" className="block text-sm font-medium text-gray-700">Last Contact Date</label>
              <input type="date" id="last-contact-date" name="lastContactDate" value={formData.lastContactDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"/>
            </div>
            <div>
              <label htmlFor="prospect-notes" className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea id="prospect-notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"></textarea>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Close</button>
            <button type="submit" className="px-4 py-2 bg-brand-purple text-white rounded-md hover:bg-brand-purple-dark">Save Prospect</button>
          </div>
        </form>
      </div>
    </div>
  );
};
