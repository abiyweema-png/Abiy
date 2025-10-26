import { Prospect, Report, ProspectStatus } from './types';

export const initialProspects: Prospect[] = [
    {
        id: '1',
        businessName: 'Innovate Tech',
        contactPerson: 'John Doe',
        contactInfo: 'john.doe@innovate.com',
        status: ProspectStatus.PITCHED,
        lastContactDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        notes: 'Interested in the premium package. Follow up on Friday.'
    },
    {
        id: '2',
        businessName: 'Sunrise Cafe',
        contactPerson: 'Jane Smith',
        contactInfo: '555-1234',
        status: ProspectStatus.CONTACTED,
        lastContactDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        notes: 'Initial contact made. Sent brochure.'
    },
     {
        id: '3',
        businessName: 'Apex Gym',
        contactPerson: 'Mike Ross',
        contactInfo: '@apexgym',
        status: ProspectStatus.CLOSED,
        lastContactDate: new Date().toISOString().slice(0, 10),
        notes: 'Closed the deal for social media management.'
    },
];

export const initialReports: Report[] = [
    {
        id: '1',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        contacted: 15,
        followUps: 5,
        positive: 3,
        calls: 2,
        closed: 1,
        challenges: 'Client had budget concerns.',
        plan: 'Focus on value proposition tomorrow.'
    }
];

export const STATUS_COLORS: { [key in ProspectStatus]: string } = {
  [ProspectStatus.PROSPECTING]: 'bg-gray-500 text-white',
  [ProspectStatus.CONTACTED]: 'bg-brand-orange text-white',
  [ProspectStatus.QUALIFIED]: 'bg-brand-purple text-white',
  [ProspectStatus.PITCHED]: 'bg-yellow-400 text-gray-800',
  [ProspectStatus.CLOSED]: 'bg-green-500 text-white',
  [ProspectStatus.COLD]: 'bg-zinc-700 text-white',
};
