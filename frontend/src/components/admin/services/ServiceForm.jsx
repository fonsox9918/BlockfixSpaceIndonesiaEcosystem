import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, serviceUpdateSchema, UNIT_OPTIONS, BADGE_OPTIONS } from "@/schema/serviceSchema";
import { useNavigate, useParams } from "react-router-dom";
import {
  getServiceById,
  createService,
  updateService,
  uploadServiceImage,
} from "@/services/serviceService";
import { toast } from "sonner";
import { Loader2, Upload, Plus, X } from "lucide-react";
import "@/styles/form.css";

const ServiceForm = ({ mode = "add" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = mode === "edit" ? serviceUpdateSchema : serviceSchema;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      unit: "",
      stock: 0,
      badges: [],
      images: [],
      type: "service",
      category: "Jasa",
    },
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      getServiceById(id)
        .then((data) => {
          console.log('Fetched service data:', data);
          reset({
            name: data.name,
            price: data.price,
            unit: data.unit,
            stock: data.stock || 0,
            badges: data.badges || [],
            images: data.images || [],
            type: "service",
            category: "Jasa",
          });
          setImagePreviews(data.images || []);
        })
        .catch((error) => {
          console.error('Error fetching service:', error);
          toast.error(error.message);
        });
    }
  }, [mode, id, reset]);

  const onFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = files.filter(file => 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      toast.error('Hanya file JPG, JPEG, PNG, dan WEBP yang diperbolehkan');
      return;
    }

    // Validate file sizes (max 5MB each)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const validSizes = validFiles.filter(file => file.size <= MAX_SIZE);

    if (validSizes.length !== validFiles.length) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    try {
      // Upload images immediately and get URLs
      const uploadPromises = validSizes.map(file => uploadServiceImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Update form data with new image URLs
      const currentImages = getValues('images') || [];
      setValue('images', [...currentImages, ...uploadedUrls]);
      
      // Update previews
      setImagePreviews(prev => [...prev, ...uploadedUrls]);
      
      toast.success('Gambar berhasil diunggah');
    } catch (error) {
      toast.error('Gagal mengunggah gambar');
      console.error('Upload error:', error);
    }
  };

  const removeImage = (index) => {
    const currentImages = getValues('images') || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue('images', newImages);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      console.log('Form data before processing:', formData);

      // Get current image URLs from form data
      const currentImages = formData.images || [];

      // Validate that we have at least one image
      if (currentImages.length === 0) {
        toast.error("Minimal satu gambar diperlukan");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock || 0),
        badges: Array.isArray(formData.badges) ? formData.badges : [],
        type: "service",
        category: "Jasa",
      };

      console.log('Submitting service payload:', payload);

      if (mode === "edit" && id) {
        await updateService(id, payload);
        toast.success("Layanan berhasil diperbarui");
      } else {
        await createService(payload);
        toast.success("Layanan berhasil ditambahkan");
      }

      navigate("/admin/services");
    } catch (error) {
      console.error('Service submission error:', error);
      toast.error(error.message || "Gagal menyimpan layanan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
      <div>
        <label className="block mb-1 font-medium">Nama Layanan *</label>
        <input
          type="text"
          {...register("name")}
          className={`w-full border rounded px-3 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          placeholder="Nama layanan"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Harga *</label>
        <input
          type="number"
          {...register("price")}
          className={`w-full border rounded px-3 py-2 ${errors.price ? "border-red-500" : "border-gray-300"}`}
          placeholder="Harga layanan"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Satuan *</label>
        <select
          {...register("unit")}
          className={`w-full border rounded px-3 py-2 ${errors.unit ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="">Pilih satuan</option>
          {UNIT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Stok</label>
        <input
          type="number"
          {...register("stock")}
          className={`w-full border rounded px-3 py-2 ${errors.stock ? "border-red-500" : "border-gray-300"}`}
          placeholder="Jumlah stok"
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Badge Layanan</label>
        <Controller
          control={control}
          name="badges"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {BADGE_OPTIONS.map((badge) => (
                <label
                  key={badge.value}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full cursor-pointer text-sm
                    ${
                      field.value?.includes(badge.value)
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    } border`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    value={badge.value}
                    checked={field.value?.includes(badge.value)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newValue = field.value || [];
                      field.onChange(
                        e.target.checked
                          ? [...newValue, value]
                          : newValue.filter((v) => v !== value)
                      );
                    }}
                  />
                  {badge.label}
                </label>
              ))}
            </div>
          )}
        />
        {errors.badges && <p className="text-red-500 text-sm mt-1">{errors.badges.message}</p>}
      </div>

      <div className="space-y-4">
        <label className="block mb-1 font-medium">Gambar Layanan *</label>
        <div 
          onClick={() => document.getElementById('service-image-upload').click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors min-h-[200px] flex flex-col items-center justify-center"
        >
          <input
            id="service-image-upload"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="space-y-4">
            <Plus className="mx-auto h-16 w-16 text-gray-400" />
            <div className="text-gray-600">
              <span className="font-medium text-lg">Klik untuk upload</span>
              <br />
              atau drag and drop
            </div>
            <p className="text-sm text-gray-500">
              Format: JPG, JPEG, PNG, WEBP (Maks. 5MB per file)
            </p>
          </div>
        </div>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreviews.map((src, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              Menyimpan...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {mode === "edit" ? "Perbarui Layanan" : "Tambah Layanan"}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
