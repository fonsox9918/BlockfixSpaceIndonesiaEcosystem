import React, { useState, useRef } from "react";
import { Upload, Camera, Sparkles, Send, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

const RoomDesign = () => {
  const { currentUser } = useAuth();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [designRequest, setDesignRequest] = useState("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (files) => {
    if (!currentUser) {
      toast.error("Silakan login terlebih dahulu");
      return;
    }

    if (files.length === 0) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`File ${file.name} bukan gambar yang valid`);
        return null;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} terlalu besar (max 10MB)`);
        return null;
      }

      try {
        // Create unique filename
        const timestamp = Date.now();
        const fileName = `room-designs/${currentUser.uid}/${timestamp}-${file.name}`;
        const storageRef = ref(storage, fileName);

        // Upload file
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return {
          id: timestamp,
          name: file.name,
          url: downloadURL,
          size: file.size,
          uploadedAt: new Date().toISOString()
        };
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Gagal upload ${file.name}: ${error.message}`);
        return null;
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(result => result !== null);
      
      setUploadedImages(prev => [...prev, ...successfulUploads]);
      
      if (successfulUploads.length > 0) {
        toast.success(`Berhasil upload ${successfulUploads.length} gambar`);
      }
    } catch (error) {
      console.error('Upload process error:', error);
      toast.error("Terjadi kesalahan saat upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    handleFileUpload(files);
  };

  const handleSubmitDesignRequest = async () => {
    if (!designRequest.trim()) {
      toast.error("Silakan masukkan deskripsi desain yang diinginkan");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("Silakan upload minimal 1 gambar ruangan");
      return;
    }

    setProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false);
      toast.success("Permintaan desain berhasil dikirim! Tim AI kami akan memproses dalam 24 jam.");
      
      // Reset form
      setDesignRequest("");
      // Keep uploaded images for reference
    }, 3000);
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    toast.success("Gambar berhasil dihapus");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-[#7C3AED]" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Desain <span className="text-[#7C3AED]">AI Ruangan</span>
            </h1>
            <Sparkles className="w-8 h-8 text-[#4FACFE]" />
          </div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload foto ruangan Anda dan biarkan AI kami menciptakan desain interior yang menakjubkan
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Upload Section */}
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Camera className="w-7 h-7 text-[#7C3AED]" />
                Upload Gambar Ruangan
              </h2>
              
              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 lg:p-12 text-center hover:border-[#7C3AED] hover:bg-purple-50 transition-all cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {uploading ? (
                  <div className="space-y-4">
                    <Loader2 className="w-12 h-12 text-[#7C3AED] mx-auto animate-spin" />
                    <p className="text-gray-600 font-medium">Mengupload gambar...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-900 font-semibold text-lg">Klik atau drag & drop gambar di sini</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Format: JPG, PNG, WEBP (Max 10MB per file)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Gambar Terupload ({uploadedImages.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button
                            onClick={() => removeImage(image.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Design Request */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-[#4FACFE]" />
                Deskripsi Desain
              </h2>
              
              <textarea
                value={designRequest}
                onChange={(e) => setDesignRequest(e.target.value)}
                placeholder="Jelaskan gaya desain yang Anda inginkan... (contoh: modern minimalis, industrial, scandinavian, dll.)"
                rows={6}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-colors resize-none"
              />
              
              <button
                onClick={handleSubmitDesignRequest}
                disabled={processing || uploadedImages.length === 0 || !designRequest.trim()}
                className="w-full mt-6 bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white py-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transition-opacity flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses Desain AI...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kirim Permintaan Desain
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <ImageIcon className="w-7 h-7 text-[#7C3AED]" />
                Cara Kerja AI Desain
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Upload Foto Ruangan</h3>
                    <p className="text-gray-600 mt-1">Upload foto ruangan dari berbagai sudut untuk hasil terbaik</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#4FACFE] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Deskripsikan Keinginan</h3>
                    <p className="text-gray-600 mt-1">Jelaskan gaya, warna, dan elemen desain yang Anda inginkan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Terima Hasil AI</h3>
                    <p className="text-gray-600 mt-1">Dapatkan 3-5 alternatif desain dalam 24 jam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200 p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                Tips untuk Hasil Terbaik
              </h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#7C3AED] mt-1 font-bold">•</span>
                  <span>Upload foto dengan pencahayaan yang baik</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#7C3AED] mt-1 font-bold">•</span>
                  <span>Sertakan foto dari berbagai sudut ruangan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#7C3AED] mt-1 font-bold">•</span>
                  <span>Jelaskan budget dan preferensi material</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#7C3AED] mt-1 font-bold">•</span>
                  <span>Sebutkan fungsi utama ruangan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#7C3AED] mt-1 font-bold">•</span>
                  <span>Berikan referensi gaya yang disukai</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDesign;
