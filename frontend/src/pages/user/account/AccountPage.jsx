import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/user/account/Sidebar';
import ProfileTab from '@/components/user/account/ProfileTab';
import AddressTab from '@/components/user/account/AddressTab';
import PreferencesTab from '@/components/user/account/PreferencesTab';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data());
      }
    };

    fetchUser();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={userData || {}} />;
      case 'address':
        return <AddressTab user={userData || {}} />;
      case 'preferences':
        return <PreferencesTab user={userData || {}} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        {userData ? renderTab() : <div className="p-4">Loading...</div>}
      </div>
    </div>
  );
};

export default AccountPage;