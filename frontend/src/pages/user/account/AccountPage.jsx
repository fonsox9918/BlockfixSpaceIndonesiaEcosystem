import React, { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { User, MapPin, Settings, Save, Camera, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { toast } from 'sonner';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    bio: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setUserData(data);
          setFormData({
            name: data.name || '',
            email: data.email || user.email || '',
            phoneNumber: data.phoneNumber || '',
            address: data.address || '',
            dateOfBirth: data.dateOfBirth || '',
            bio: data.bio || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Gagal memuat data pengguna');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setSaving(true);
    try {
      const ref = doc(db, 'users', user.uid);
      await updateDoc(ref, {
        ...formData,
        updatedAt: new Date()
      });
      
      setUserData(prev => ({ ...prev, ...formData }));
      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Gagal memperbarui profil');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'address', label: 'Alamat', icon: MapPin },
    { id: 'preferences', label: 'Preferensi', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED] mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data akun...</p>
        </div>
      </div>
    );
  }

  // Profile Header Component (akan ditampilkan di atas untuk mobile)
  const ProfileHeader = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#7C3AED] to-[#4FACFE] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
            {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <button className="absolute -bottom-2 -right-2 bg-[#7C3AED] p-2 rounded-full text-white hover:bg-[#6B21A8] transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{formData.name || 'fonso dev'}</h2>
          <p className="text-gray-600">{formData.email || 'fonsodev@gmail.com'}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">Akun Terverifikasi</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Form */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Informasi Pribadi</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-900 font-medium mb-2">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-colors"
                placeholder="fonso dev"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none cursor-not-allowed"
                placeholder="fonsodev@gmail.com"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Nomor Telepon</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-colors"
                placeholder="Masukkan nomor telepon"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Tanggal Lahir</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-900 font-medium mb-2">Alamat</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-colors resize-none"
                placeholder="Jatiasih Objek"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg transition-opacity flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddressTab = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Alamat Pengiriman</h3>
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Alamat</h4>
        <p className="text-gray-600 mb-6">Tambahkan alamat untuk memudahkan pengiriman</p>
        <button className="bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          Tambah Alamat
        </button>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferensi Akun</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Notifikasi Email</h4>
            <p className="text-gray-600 text-sm">Terima update pesanan via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Notifikasi Push</h4>
            <p className="text-gray-600 text-sm">Terima notifikasi di browser</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Newsletter</h4>
            <p className="text-gray-600 text-sm">Terima tips dan penawaran khusus</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'address':
        return renderAddressTab();
      case 'preferences':
        return renderPreferencesTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Akun</h1>
          <p className="text-gray-600">Kelola informasi pribadi dan preferensi akun Anda</p>
        </div>

        {/* Profile Header - Tampil di atas untuk mobile */}
        <div className="lg:hidden">
          <ProfileHeader />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Profile Header - Tampil di samping untuk desktop */}
            <div className="hidden lg:block">
              <ProfileHeader />
            </div>
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
