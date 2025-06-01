import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Upload, Plus } from "lucide-react";
import {
  productSchema,
  productUpdateSchema,
  UNIT_OPTIONS,
  CATEGORY_OPTIONS,
  LOCATION_OPTIONS,
  BADGE_OPTIONS,
  RATING_OPTIONS,
} from "@/schema/productSchema";
import {
  getProductById,
  createProduct,
  updateProduct,
  uploadMultipleImages,
} from "@/services/productService";
import "@/styles/form.css";

const ProductForm = ({ mode = "add" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = mode === "edit" ? productUpdateSchema : productSchema;

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      originalPrice: "",
      discountPercent: 0,
      unit: "",
      type: "product",
      category: "",
      description: "",
      rating: 0,
      soldCount: 0,
      stock: 0,
      location: "",
      shippingEstimate: "",
      badges: [],
      images: [],
    },
  });

  // Watch values for calculating discounted price
  const price = watch("price");
  const discountPercent = watch("discountPercent");
  const calculatedPrice = price ? price - (price * (discountPercent || 0)) / 100 : 0;

  useEffect(() => {
    if (mode === "edit" && id) {
      getProductById(id)
        .then((data) => {
          reset({
            name: data.name,
            price: data.price,
            originalPrice: data.originalPrice,
            discountPercent: data.discountPercent || 0,
            unit: data.unit,
            type: data.type,
            category: data.category,
            description: data.description,
            rating: data.rating || 0,
            soldCount: data.soldCount || 0,
            stock: data.stock || 0,
            location: data.location,
            shippingEstimate: data.shippingEstimate,
            badges: data.badges || [],
            images: data.images || [],
          });
          setImagePreviews(data.images || []);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [mode, id, reset]);

  const onFileChange = (e) => {
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

    setImageFiles(validFiles);
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      // Validate images manually (not through Zod)
      const totalImages = (formData.images || []).length + imageFiles.length;
      if (mode === 'add' && totalImages === 0) {
        toast.error('Upload minimal 1 gambar produk');
        return;
      }

      // Upload new images if any
      let uploadedUrls = [...(formData.images || [])];
      if (imageFiles.length > 0) {
        try {
          const newUrls = await uploadMultipleImages(imageFiles);
          uploadedUrls = [...uploadedUrls, ...newUrls];
        } catch (error) {
          toast.error('Gagal upload gambar: ' + error.message);
          return;
        }
      }

      // Prepare payload with proper type conversion
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice && Number(formData.originalPrice) > 0 ? Number(formData.originalPrice) : null,
        discountPercent: Number(formData.discountPercent) || 0,
        rating: Number(formData.rating) || 0,
        soldCount: Number(formData.soldCount) || 0,
        stock: Number(formData.stock) || 0,
        badges: Array.isArray(formData.badges) ? formData.badges : [],
        images: uploadedUrls,
        type: "product",
      };

      // Remove null/undefined fields for cleaner payload
      Object.keys(payload).forEach(key => {
        if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
          delete payload[key];
        }
      });

      console.log('Submitting payload:', payload); // Debug log

      // Submit to API
      if (mode === "edit" && id) {
        await updateProduct(id, payload);
        toast.success("Produk berhasil diperbarui");
      } else {
        await createProduct(payload);
        toast.success("Produk berhasil ditambahkan");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message || "Gagal menyimpan produk");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama Produk *</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full border rounded px-3 py-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nama produk"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Harga *</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className={`w-full border rounded px-3 py-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Harga produk"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Harga Asli</label>
            <input
              type="number"
              {...register("originalPrice", { valueAsNumber: true })}
              className={`w-full border rounded px-3 py-2 ${
                errors.originalPrice ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Harga sebelum diskon"
            />
            {errors.originalPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.originalPrice.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Diskon (%)</label>
          <div className="space-y-2">
            <input
              type="range"
              {...register("discountPercent", { valueAsNumber: true })}
              min="0"
              max="100"
              step="1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Diskon: {discountPercent || 0}%</span>
              <span>
                Harga Akhir: Rp{" "}
                {calculatedPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          {errors.discountPercent && (
            <p className="text-red-500 text-sm mt-1">
              {errors.discountPercent.message}
            </p>
          )}
        </div>
      </div>

      {/* Category and Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Kategori *</label>
          <select
            {...register("category")}
            className={`w-full border rounded px-3 py-2 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Pilih kategori</option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Satuan *</label>
          <select
            {...register("unit")}
            className={`w-full border rounded px-3 py-2 ${
              errors.unit ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Pilih satuan</option>
            {UNIT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.unit && (
            <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Deskripsi</label>
        <textarea
          {...register("description")}
          rows={4}
          className={`w-full border rounded px-3 py-2 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Deskripsi produk"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Stock and Rating */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Stok</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className={`w-full border rounded px-3 py-2 ${
              errors.stock ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Jumlah stok"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <select
            {...register("rating", { valueAsNumber: true })}
            className={`w-full border rounded px-3 py-2 ${
              errors.rating ? "border-red-500" : "border-gray-300"
            }`}
          >
            {RATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ⭐
              </option>
            ))}
          </select>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Terjual</label>
          <input
            type="number"
            {...register("soldCount", { valueAsNumber: true })}
            className={`w-full border rounded px-3 py-2 ${
              errors.soldCount ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Jumlah terjual"
          />
          {errors.soldCount && (
            <p className="text-red-500 text-sm mt-1">{errors.soldCount.message}</p>
          )}
        </div>
      </div>

      {/* Location and Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Lokasi</label>
          <select
            {...register("location")}
            className={`w-full border rounded px-3 py-2 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Pilih lokasi</option>
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Estimasi Pengiriman</label>
          <input
            type="text"
            {...register("shippingEstimate")}
            className={`w-full border rounded px-3 py-2 ${
              errors.shippingEstimate ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Contoh: 1-3 hari kerja"
          />
          {errors.shippingEstimate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.shippingEstimate.message}
            </p>
          )}
        </div>
      </div>

      {/* Badges */}
      <div>
        <label className="block mb-1 font-medium">Badge Produk</label>
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
        {errors.badges && (
          <p className="text-red-500 text-sm mt-1">{errors.badges.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <label className="block mb-1 font-medium">Gambar Produk *</label>
        <label
          htmlFor="image-upload"
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <input
            id="image-upload"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="space-y-2">
            <Plus className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-gray-600">
              <span className="font-medium">Klik untuk upload</span> atau drag and
              drop
            </div>
            <p className="text-xs text-gray-500">
              Format: JPG, JPEG, PNG, WEBP
            </p>
          </div>
        </label>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreviews.map((src, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images.message}</p>
        )}
      </div>

      {/* Submit Button */}
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
              {mode === "edit" ? "Perbarui Produk" : "Tambah Produk"}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
