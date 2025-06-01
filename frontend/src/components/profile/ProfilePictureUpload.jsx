import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

const ProfilePictureUpload = ({ currentPhotoURL, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const storage = getStorage();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran foto maksimal 2MB');
      return;
    }

    setUploading(true);
    const user = auth.currentUser;
    const ext = file.name.split('.').pop();
    const storageRef = ref(storage, `profile_pictures/${user.uid}.${ext}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      if (onUploadSuccess) onUploadSuccess(url);
      toast.success('Foto profil berhasil diunggah!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Gagal mengunggah foto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3 mb-4">
      <img
        src={currentPhotoURL || '/default-avatar.png'}
        alt="Foto Profil"
        className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md"
      />
      <label className="cursor-pointer text-sm bg-white text-black py-1 px-3 rounded-full font-medium hover:opacity-90 transition">
        {uploading ? 'Mengunggah...' : 'Ganti Foto'}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default ProfilePictureUpload;