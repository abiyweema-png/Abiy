

import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/Icons';

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, onClick, children }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <h2>
      <button
        type="button"
        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={onClick}
      >
        <span>{title}</span>
        <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </h2>
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
      <div className="p-5 border-t border-gray-200 text-gray-600">
        {children}
      </div>
    </div>
  </div>
);

export const GuidelineView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const guidelineData = [
    {
      title: '✅ Role Overview & Expectations',
      content: (
        <>
          <p><strong>Primary Responsibility:</strong> Identify potential clients, reach out professionally, present our services, and handle onboarding.</p>
          <p>This is a <strong>part-time, commission-based</strong> role.</p>
          <h5 className="font-semibold text-gray-800 mt-4">🕒 Daily Expectations</h5>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Reach out to <strong>2-4 prospects</strong> every day.</li>
            <li>Follow up with previously contacted prospects.</li>
            <li>Record all communication activities.</li>
            <li>Submit a daily report every night (before 9:00 PM).</li>
          </ul>
        </>
      ),
    },
    {
      title: '💰 Commission & Sales Workflow',
      content: (
        <>
          <h5 className="font-semibold text-gray-800">💰 Commission Structure</h5>
          <p className="mt-2">You get <strong>10% commission</strong> from the <strong>total payment</strong> of each successfully closed project, paid after the initial payment is received.</p>
          <h5 className="font-semibold text-gray-800 mt-4">💼 Sales Workflow</h5>
          <ol className="list-decimal list-inside mt-2 space-y-2">
            <li><strong>Client Research & Prospecting:</strong> Look for businesses with poor/no social media presence (clinics, restaurants, real estate, gyms, etc.).</li>
            <li><strong>Initial Outreach:</strong> Use DMs, calls, or email. Introduce yourself, the agency, and the value you offer.</li>
            <li><strong>Lead Qualification:</strong> Check for interest, budget, and need.</li>
            <li><strong>Pitching Services:</strong> Explain benefits clearly, offer 2-3 packages, and don't over-promise.</li>
            <li><strong>Handling Objections:</strong> Respond calmly with value propositions, past examples, and industry data.</li>
            <li><strong>Closing the Client:</strong> Gather brand info, goals, and access, then inform the agency owner.</li>
          </ol>
        </>
      ),
    },
    {
      title: '📥 Onboarding & Follow-Up',
      content: (
        <>
          <h5 className="font-semibold text-gray-800">📥 Onboarding Process</h5>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Send onboarding questionnaire.</li>
            <li>Create a shared client group (WhatsApp/Telegram).</li>
            <li>Collect brand assets (logo, photos, etc.).</li>
            <li>Confirm package & payment method.</li>
          </ul>
          <h5 className="font-semibold text-gray-800 mt-4">🔁 Follow-Up Rules</h5>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>1st follow-up:</strong> Next day</li>
            <li><strong>2nd follow-up:</strong> After 2 days</li>
            <li><strong>3rd follow-up:</strong> After 5 days</li>
            <li>If no reply after 3rd attempt, move to "Cold" list.</li>
          </ul>
        </>
      ),
    },
    {
      title: '🚫 Rules & Scripts',
      content: (
        <>
          <h5 className="font-semibold text-gray-800">🚫 What You Must Not Do</h5>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Do NOT be rude.</li>
            <li>Do NOT promise unrealistic results.</li>
            <li>Do NOT discuss pricing discounts without approval.</li>
            <li>Do NOT use personal opinions.</li>
          </ul>
          <h5 className="font-semibold text-gray-800 mt-4">🧾 Sales Script (Short Example)</h5>
          <div className="bg-gray-100 p-4 rounded-md mt-2 border border-gray-200">
            <code className="text-sm text-gray-700">
              Hello, my name is [Name]. I work at a digital marketing agency that helps businesses like yours increase brand visibility and boost client engagement on social media.
              <br/><br/>
              I’ve noticed your page has good potential, and I believe consistent professional content can improve your reach.
              <br/><br/>
              Can we talk briefly about how our agency can support your growth?
            </code>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Digital Marketing Agency Salesperson Guideline</h2>
      <hr className="mb-6" />
      <div className="space-y-4">
        {guidelineData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};