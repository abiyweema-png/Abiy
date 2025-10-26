import React, { useState, useEffect } from 'react';
import type { Prospect } from '../types';
import { GoogleGenAI } from '@google/genai';
import { SparklesIcon } from './Icons';

interface AiAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect: Prospect | null;
}

const salesScriptBase = `Hello, my name is [Name]. I work at Eyoha Digitals, a digital marketing agency that helps businesses like yours increase brand visibility and boost client engagement on social media. I’ve noticed your page has good potential, and I believe consistent professional content can improve your reach. Can we talk briefly about how our agency can support your growth?`;

export const AiAssistModal: React.FC<AiAssistModalProps> = ({ isOpen, onClose, prospect }) => {
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when modal is opened or closed
    if (isOpen) {
      setGeneratedMessage('');
      setError(null);
    }
  }, [isOpen]);

  const handleGenerateMessage = async () => {
    if (!prospect) return;
    setIsLoading(true);
    setError(null);
    setGeneratedMessage('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const prompt = `You are an expert salesperson for Eyoha Digitals. Your goal is to write a short, friendly, and professional outreach message to a potential client.
      
      Use the following information to personalize the message:
      - Business Name: ${prospect.businessName}
      - Contact Person: ${prospect.contactPerson || 'there'}
      - Notes about them: ${prospect.notes || 'None'}
      
      Base the message on this template, but adapt it to sound natural and personal based on the provided info. Keep it concise (under 100 words) and engaging.
      
      Template: "${salesScriptBase}"
      
      Begin the message now:`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setGeneratedMessage(response.text.trim());
    } catch (err) {
      console.error(err);
      setError('Failed to generate message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage).then(() => {
        alert('Message copied to clipboard!');
    }, (err) => {
        console.error('Could not copy text: ', err);
        alert('Failed to copy message.');
    });
  };

  if (!isOpen || !prospect) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-fade-in-up">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <SparklesIcon />
            <span className="ml-2">AI Sales Assistant</span>
          </h3>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <div className="p-6">
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-700">Prospect Details:</h4>
                <p className="text-sm text-gray-600"><strong>Business:</strong> {prospect.businessName}</p>
                {prospect.contactPerson && <p className="text-sm text-gray-600"><strong>Contact:</strong> {prospect.contactPerson}</p>}
                {prospect.notes && <p className="text-sm text-gray-600"><strong>Notes:</strong> {prospect.notes}</p>}
            </div>

            <div className="mb-4">
                <button 
                    onClick={handleGenerateMessage}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-2 bg-brand-orange text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                       '✨ Generate Outreach Message'
                    )}
                </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            
            {generatedMessage && (
                <div className="space-y-3">
                     <textarea
                        readOnly
                        value={generatedMessage}
                        className="w-full h-48 p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-brand-purple focus:border-brand-purple"
                        aria-label="Generated outreach message"
                    />
                     <button
                        onClick={handleCopyToClipboard}
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Copy to Clipboard
                    </button>
                </div>
            )}

        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Close</button>
        </div>
      </div>
    </div>
  );
};