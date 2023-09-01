import React, { useState } from 'react';

const ManageDataSources = () => {
  const [dataSources, setDataSources] = useState([]);
  const [sourceType, setSourceType] = useState('');
  const [dbType, setDbType] = useState('');
  const [dbName, setDbName] = useState('');
  const [dbHost, setDbHost] = useState('');
  const [dbUser, setDbUser] = useState('');
  const [dbPassword, setDbPassword] = useState('');
  const [dbPort, setDbPort] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddDataSource = () => {
    const dataSource = {
      sourceType,
      dbType,
      dbName,
      dbHost,
      dbUser,
      dbPassword,
      dbPort,
      apiKey,
      selectedUsers,
    };
    if (editingIndex !== null) {
      const updatedDataSources = [...dataSources];
      updatedDataSources[editingIndex] = dataSource;
      setDataSources(updatedDataSources);
      setEditingIndex(null);
    } else {
      setDataSources([...dataSources, dataSource]);
    }
    setSourceType('');
    setDbType('');
    setDbName('');
    setDbHost('');
    setDbUser('');
    setDbPassword('');
    setDbPort('');
    setApiKey('');
    setSelectedUsers([]);
  };

  const handleEditDataSource = (index) => {
    const dataSource = dataSources[index];
    setSourceType(dataSource.sourceType);
    setDbType(dataSource.dbType);
    setDbName(dataSource.dbName);
    setDbHost(dataSource.dbHost);
    setDbUser(dataSource.dbUser);
    setDbPassword(dataSource.dbPassword);
    setDbPort(dataSource.dbPort);
    setApiKey(dataSource.apiKey);
    setSelectedUsers(dataSource.selectedUsers);
    setEditingIndex(index);
  };
  
  const handleDeleteDataSource = (index) => {
    const updatedDataSources = [...dataSources];
    updatedDataSources.splice(index, 1);
    setDataSources(updatedDataSources);
  };


  return (
    <div>
      <h2>Manage Data Sources</h2>
      <div>
        <label>Source Type:</label>
        <select onChange={e => setSourceType(e.target.value)} value={sourceType}>
          <option value="">Select</option>
          <option value="database">Database</option>
          <option value="stripe">Stripe</option>
          <option value="google_tags">Google Tags</option>
        </select>
      </div>
      {sourceType === 'database' && (
        <div>
          <label>Database Type:</label>
          <select onChange={e => setDbType(e.target.value)} value={dbType}>
            <option value="">Select</option>
            <option value="postgres">Postgres</option>
            <option value="mysql">MySQL</option>
            <option value="sqlite">SQLite</option>
          </select>
          <input type="text" placeholder="DB Name" value={dbName} onChange={e => setDbName(e.target.value)} />
          <input type="text" placeholder="DB Host" value={dbHost} onChange={e => setDbHost(e.target.value)} />
          <input type="text" placeholder="DB User" value={dbUser} onChange={e => setDbUser(e.target.value)} />
          <input type="password" placeholder="DB Password" value={dbPassword} onChange={e => setDbPassword(e.target.value)} />
          <input type="text" placeholder="DB Port" value={dbPort} onChange={e => setDbPort(e.target.value)} />
        </div>
      )}
      {(sourceType === 'stripe' || sourceType === 'google_tags') && (
        <div>
          <input type="text" placeholder="API Key" value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </div>
      )}
      <button onClick={handleAddDataSource}>{editingIndex !== null ? 'Update' : 'Add'} Data Source</button>
      <div>
        <h3>Data Sources:</h3>
        {dataSources.map((source, index) => (
          <div key={index}>
            <span>{source.sourceType}</span>
            <button onClick={() => handleEditDataSource(index)}>Edit</button>
            <button onClick={() => handleDeleteDataSource(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDataSources;