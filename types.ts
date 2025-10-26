
export type View = 'dashboard' | 'prospects' | 'report' | 'guideline';

export enum ProspectStatus {
  PROSPECTING = 'Prospecting',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  PITCHED = 'Pitched',
  CLOSED = 'Closed',
  COLD = 'Cold',
}

export interface Prospect {
  id: string;
  businessName: string;
  contactPerson: string;
  contactInfo: string;
  status: ProspectStatus;
  lastContactDate: string;
  notes: string;
}

export interface Report {
  id: string;
  date: string;
  contacted: number;
  followUps: number;
  positive: number;
  calls: number;
  closed: number;
  challenges: string;
  plan: string;
}
