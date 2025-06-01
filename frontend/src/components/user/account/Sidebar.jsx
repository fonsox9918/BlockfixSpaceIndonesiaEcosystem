import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { key: 'profile', label: 'Biodata Diri' },
    { key: 'address', label: 'Daftar Alamat' },
    { key: 'preferences', label: 'Preferensi' },
  ];

  return (
    <aside className="w-full md:w-64 border-r bg-white">
      <div className="p-4 font-bold text-lg">Pengaturan Akun</div>
      <ul>
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              activeTab === item.key ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;