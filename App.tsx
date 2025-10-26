
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './views/DashboardView';
import { ProspectsView } from './views/ProspectsView';
import { ReportView } from './views/ReportView';
import { GuidelineView } from './views/GuidelineView';
import type { View, Prospect, Report } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialProspects, initialReports } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [prospects, setProspects] = useLocalStorage<Prospect[]>('prospects', initialProspects);
  const [reports, setReports] = useLocalStorage<Report[]>('reports', initialReports);

  const addReport = useCallback((report: Omit<Report, 'id'>) => {
    const newReport: Report = { ...report, id: Date.now().toString() };
    setReports(prevReports => [newReport, ...prevReports]);
  }, [setReports]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView prospects={prospects} />;
      case 'prospects':
        return <ProspectsView prospects={prospects} setProspects={setProspects} />;
      case 'report':
        return <ReportView reports={reports} addReport={addReport} />;
      case 'guideline':
        return <GuidelineView />;
      default:
        return <DashboardView prospects={prospects} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
