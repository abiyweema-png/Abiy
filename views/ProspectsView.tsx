import React, { useState } from 'react';
import type { Prospect } from '../types';
import { ProspectStatus } from '../types';
import { ProspectModal } from '../components/ProspectModal';
import { AiAssistModal } from '../components/AiAssistModal';
import { STATUS_COLORS } from '../constants';
import { PeopleIcon, PlusCircleIcon, PencilIcon, TrashIcon, SparklesIcon } from '../components/Icons';

interface ProspectsViewProps {
  prospects: Prospect[];
  setProspects: React.Dispatch<React.SetStateAction<Prospect[]>>;
}

export const ProspectsView: React.FC<ProspectsViewProps> = ({ prospects, setProspects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedProspectForAi, setSelectedProspectForAi] = useState<Prospect | null>(null);

  const openAddModal = () => {
    setEditingProspect(null);
    setIsModalOpen(true);
  };

  const openEditModal = (prospect: Prospect) => {
    setEditingProspect(prospect);
    setIsModalOpen(true);
  };

  const openAiModal = (prospect: Prospect) => {
    setSelectedProspectForAi(prospect);
    setIsAiModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prospect?')) {
      setProspects(prospects.filter(p => p.id !== id));
    }
  };

  const handleSave = (prospect: Prospect) => {
    if (editingProspect) {
      setProspects(prospects.map(p => (p.id === prospect.id ? prospect : p)));
    } else {
      setProspects([...prospects, { ...prospect, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <PeopleIcon />
          <span className="ml-2">Manage Prospects</span>
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center px-4 py-2 bg-brand-purple text-white rounded-lg shadow-md hover:bg-brand-purple-dark transition-colors duration-300"
        >
          <PlusCircleIcon />
          <span className="ml-2">Add New Prospect</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Business Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact Person</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact Info</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Contact</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prospects.length > 0 ? prospects.map(prospect => (
                <tr key={prospect.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prospect.businessName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prospect.contactPerson}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prospect.contactInfo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[prospect.status]}`}>
                      {prospect.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prospect.lastContactDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openAiModal(prospect)} className="text-brand-orange hover:text-yellow-500 mr-4" title="AI Assist">
                      <SparklesIcon />
                    </button>
                    <button onClick={() => openEditModal(prospect)} className="text-brand-purple hover:text-brand-purple-dark mr-4" title="Edit">
                      <PencilIcon />
                    </button>
                    <button onClick={() => handleDelete(prospect.id)} className="text-red-600 hover:text-red-900" title="Delete">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              )) : (
                 <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">No prospects found. Add one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProspectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        prospect={editingProspect}
      />

      <AiAssistModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        prospect={selectedProspectForAi}
      />
    </div>
  );
};