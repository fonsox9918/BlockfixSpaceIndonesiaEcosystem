const ImageUploader = ({ label, multiple = false, onChange, preview }) => {
  const handleFileChange = (e) => {
    const files = multiple ? Array.from(e.target.files) : e.target.files[0];
    onChange(files);
  };

  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <input
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm text-gray-400"
      />
      {preview && (
        <div className="mt-2 flex flex-wrap gap-2">
          {(Array.isArray(preview) ? preview : [preview]).map((src, i) => (
            <img key={i} src={src} alt="preview" className="w-20 h-20 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;