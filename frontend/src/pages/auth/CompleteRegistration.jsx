import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadFile } from '@/firebase/uploadService';
import { useNavigate } from 'react-router-dom';

const CompleteRegistration = () => {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [addressLabel, setAddressLabel] = useState('Rumah');
  const [recipient, setRecipient] = useState('');
  const [phoneAddress, setPhoneAddress] = useState('');
  const [street, setStreet] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email || '');
        setDisplayName(auth.currentUser.displayName || '');
        setPhotoURL(auth.currentUser.photoURL || '');
        setRecipient(auth.currentUser.displayName || '');

        const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.address) {
            setAddressLabel(data.address.label || 'Rumah');
            setRecipient(data.address.recipient || '');
            setPhoneAddress(data.address.phone || '');
            setStreet(data.address.street || '');
            setKelurahan(data.address.kelurahan || '');
            setKecamatan(data.address.kecamatan || '');
            setCity(data.address.city || '');
            setProvince(data.address.province || '');
            setPostalCode(data.address.postalCode || '');
          }
        }
      }
    };
    loadUserData();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Hanya file gambar yang diperbolehkan');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }

    setUploading(true);
    setError('');
    setPhotoFile(file);

    try {
      const url = await uploadFile(file, auth.currentUser.uid, (p) =>
        setUploadProgress(p)
      );
      setPhotoURL(url);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload gagal: ' + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (uploading) {
      setError('Tunggu hingga upload selesai.');
      return;
    }

    if (
      !displayName.trim() ||
      !recipient.trim() ||
      !phoneAddress.trim() ||
      !street.trim() ||
      !city.trim() ||
      !province.trim() ||
      !postalCode.trim()
    ) {
      setError('Field yang wajib diisi belum lengkap.');
      return;
    }

    setLoading(true);
    try {
      const imageUrl = photoURL;

      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
        photoURL: imageUrl,
      });

      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: displayName.trim(),
        photoURL: imageUrl,
        address: {
          label: addressLabel,
          recipient: recipient.trim(),
          phone: phoneAddress.trim(),
          street: street.trim(),
          kelurahan: kelurahan.trim(),
          kecamatan: kecamatan.trim(),
          city: city.trim(),
          province: province.trim(),
          postalCode: postalCode.trim(),
          country: 'Indonesia',
          lat: 0,
          lng: 0,
          isPrimary: true,
        },
        updatedAt: new Date(),
      });

      alert('Profil berhasil diperbarui!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Lengkapi Profil Anda</h2>
    
    <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded">
      Untuk menyelesaikan pendaftaran akun Anda, mohon lengkapi informasi profil dan alamat dengan benar. Data ini akan digunakan untuk keperluan verifikasi dan pengiriman.
    </div>
    
    
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-50 relative hover:brightness-90 transition">
                {photoURL ? (
                  <img src={photoURL} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-6xl font-light select-none">+</div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition">
                  Ganti Foto
                </div>
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full mt-3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-center mt-1">
                  Mengupload {uploadProgress}%
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2 text-center">
              Format: JPG/PNG, Maks. 5MB
            </p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                readOnly
                disabled
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor HP
              </label>
              <input
                type="tel"
                value={phoneAddress}
                onChange={(e) => setPhoneAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="0812xxxxxxx"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jalan / Kompleks
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Jl. Melati No.10, RT 03 RW 02"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kelurahan
                </label>
                <input
                  type="text"
                  value={kelurahan}
                  onChange={(e) => setKelurahan(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Kelurahan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kecamatan
                </label>
                <input
                  type="text"
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Kecamatan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Kota"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provinsi
                </label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Provinsi"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kode Pos
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Kode Pos"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan dan Lanjutkan'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompleteRegistration;