import React from 'react';

const PreferencesTab = ({ user }) => {
  const pref = user.preferences || {};
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-semibold">Preferensi</h2>
      <p><strong>Bahasa:</strong> {pref.language}</p>
      <p><strong>Tema:</strong> {pref.theme}</p>
      <p><strong>Notifikasi:</strong> {pref.notification ? 'Aktif' : 'Nonaktif'}</p>
    </div>
  );
};

export default PreferencesTab;