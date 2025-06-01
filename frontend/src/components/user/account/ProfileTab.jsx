import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "@/firebase/firebaseConfig";
import { db } from "@/firebase/firebaseConfig";
import { uploadFile } from "@/firebase/uploadService";

export default function ProfileTab({ user }) {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [birthDate, setBirthDate] = useState(user.extra?.birthDate || "");
  const [gender, setGender] = useState(user.extra?.gender || "");
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Hanya file gambar yang diperbolehkan");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      return;
    }

    setUploading(true);
    setError("");
    setPhotoFile(file);

    try {
      const url = await uploadFile(file, auth.currentUser.uid, (p) =>
        setUploadProgress(p)
      );
      setPhotoURL(url);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload gagal: " + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) {
      setError("Tunggu hingga upload selesai.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const imageUrl = photoURL;

      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
        photoURL: imageUrl,
      });

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        displayName: displayName.trim(),
        photoURL: imageUrl,
        "extra.birthDate": birthDate,
        "extra.gender": gender,
      });

      setShowEditPopup(false);
    } catch (err) {
      setError("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow rounded-xl p-6">
      <form onSubmit={handleSubmit}>

        {/* FOTO PROFIL */}
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-50 relative hover:brightness-90 transition">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="Foto"
                  className="w-full h-full object-cover"
                />
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
              <p className="text-xs text-center mt-1">Mengupload {uploadProgress}%</p>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2 text-center">Format: JPG/PNG, Maks. 5MB</p>
        </div>

{/* BIODATA */}
<div className="mt-8 space-y-4 text-sm">
  <div className="flex justify-between border-b pb-3">
    <div>
      <p className="text-gray-500">Nama</p>
      <p className="text-gray-900 font-medium">{displayName || "-"}</p>
    </div>
  </div>
  <div className="flex justify-between border-b pb-3">
    <div>
      <p className="text-gray-500">Tanggal Lahir</p>
      <p className="text-gray-900 font-medium">{birthDate || "- Tambah Tanggal Lahir"}</p>
    </div>
  </div>
  <div className="flex justify-between border-b pb-3">
    <div>
      <p className="text-gray-500">Jenis Kelamin</p>
      <p className="text-gray-900 font-medium">{gender || "- Tambah Jenis Kelamin"}</p>
    </div>
  </div>
</div>
        {/* TOMBOL UBAH BIODATA */}
        <button
          type="button"
          onClick={() => setShowEditPopup(true)}
          className="mt-6 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Ubah Biodata Diri
        </button>

        {/* MODAL UBAH */}
        {showEditPopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Edit Biodata Diri</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nama</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Jenis Kelamin</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditPopup(false)}
                  className="px-4 py-2 rounded border"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled={loading || uploading}
                >
                  {loading ? "Menyimpan..." : "Simpan Profil"}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}