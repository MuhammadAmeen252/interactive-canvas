import React, { useState } from 'react';
import ManageTeam from './settings/ManageTeam';
import ManageDataSources  from './settings/ManageDataSources';
import Billing  from './settings/Billing';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('team');

  const renderContent = () => {
    switch (activeTab) {
      case 'team': return <ManageTeam />;
      case 'datasources': return <ManageDataSources />;
      case 'billing': return < Billing />;
      default: return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('team')}>Manage Team</button>
        <button onClick={() => setActiveTab('datasources')}>Data Sources</button>
        <button onClick={() => setActiveTab('billing')}>Billing</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Settings;