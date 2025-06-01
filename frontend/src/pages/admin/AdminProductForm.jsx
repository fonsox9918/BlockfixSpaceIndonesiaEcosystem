import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, getProductById, updateProduct, uploadProductImage } from "@/firebase/productService";
import { productSchema } from "@/schema/productSchema";
import { Plus, Loader2 } from "lucide-react";

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(productSchema)
  });

  useEffect(() => {
    if (isEdit) {
      getProductById(id).then((data) => {
        reset(data);
        if (data.imageUrl) {
          setPreviewUrl(data.imageUrl);
        }
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (imageFile) {
        const url = await uploadProductImage(imageFile, data.slug);
        data.imageUrl = url;
      }
      if (data.tags) {
        data.tags = data.tags.split(",").map(tag => tag.trim());
      }

      if (isEdit) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("Gagal menyimpan produk:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block font-medium">Nama Produk</label>
          <input className="w-full border p-2 rounded" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        {/* Slug */}
        <div>
          <label className="block font-medium">Slug Produk</label>
          <input className="w-full border p-2 rounded" {...register("slug")} />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
        </div>
        {/* Harga */}
        <div>
          <label className="block font-medium">Harga (Rp)</label>
          <input type="number" className="w-full border p-2 rounded" {...register("unitPrice", { valueAsNumber: true })} />
          {errors.unitPrice && <p className="text-red-500 text-sm">{errors.unitPrice.message}</p>}
        </div>
        {/* Unit Label */}
        <div>
          <label className="block font-medium">Label Satuan (contoh: m², paket, buah)</label>
          <input className="w-full border p-2 rounded" {...register("unitLabel")} />
          {errors.unitLabel && <p className="text-red-500 text-sm">{errors.unitLabel.message}</p>}
        </div>
        {/* Tipe Harga */}
        <div>
          <label className="block font-medium">Tipe Harga</label>
          <select className="w-full border p-2 rounded" {...register("pricingType")}>
            <option value="">Pilih tipe harga</option>
            <option value="per_m2">per m²</option>
            <option value="per_unit">per unit</option>
          </select>
          {errors.pricingType && <p className="text-red-500 text-sm">{errors.pricingType.message}</p>}
        </div>
        {/* Tipe Produk */}
        <div>
          <label className="block font-medium">Tipe Produk</label>
          <select className="w-full border p-2 rounded" {...register("type")}>
            <option value="">Pilih tipe</option>
            <option value="material">Material</option>
            <option value="service">Service</option>
            <option value="retail">Retail</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>
        {/* Kategori */}
        <div>
          <label className="block font-medium">Kategori Produk</label>
          <select className="w-full border p-2 rounded" {...register("category")}> 
            <option value="">Pilih kategori</option>
            <option value="jasa">Jasa</option>
            <option value="material">Material</option>
            <option value="smart-device">Smart Device</option>
            <option value="furniture">Furniture</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        {/* Material Type */}
        <div>
          <label className="block font-medium">Tipe Material</label>
          <select className="w-full border p-2 rounded" {...register("materialType")}>
            <option value="">Pilih tipe</option>
            <option value="WPC">WPC</option>
            <option value="PVC">PVC</option>
            <option value="Smart Device">Smart Device</option>
            <option value="Kayu">Kayu</option>
          </select>
        </div>
        {/* Unit */}
        <div>
          <label className="block font-medium">Satuan Unit</label>
          <select className="w-full border p-2 rounded" {...register("unit")}> 
            <option value="">Pilih satuan</option>
            <option value="meter">meter</option>
            <option value="m²">m²</option>
            <option value="paket">paket</option>
            <option value="buah">buah</option>
          </select>
        </div>
        {/* Stok */}
        <div>
          <label className="block font-medium">Stok</label>
          <input type="number" className="w-full border p-2 rounded" {...register("stock", { valueAsNumber: true })} />
        </div>
        {/* Deskripsi */}
        <div>
          <label className="block font-medium">Deskripsi Produk</label>
          <textarea className="w-full border p-2 rounded" rows={4} {...register("description")} />
        </div>
        {/* Highlight */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("highlight")} id="highlight" />
          <label htmlFor="highlight">Tampilkan sebagai produk unggulan</label>
        </div>
        {/* Tags */}
        <div>
          <label className="block font-medium">Tags (pisahkan dengan koma)</label>
          <input className="w-full border p-2 rounded" {...register("tags")} />
        </div>
        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select className="w-full border p-2 rounded" {...register("status")}>
            <option value="">Pilih status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>
        {/* Upload Gambar */}
        <div>
          <label className="block font-medium">Gambar Produk</label>
          <div className="relative w-32 h-32 border rounded flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <Plus className="w-6 h-6 text-violet-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
