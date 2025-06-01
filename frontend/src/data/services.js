const services = [
  {
    id: 1,
    name: "Plafond PVC",
    slug: "plafond-pvc",
    image: "https://via.placeholder.com/400x250?text=Plafond+PVC",
    description: "Plafon modern dari PVC, tahan air dan anti rayap."
  },
  {
    id: 2,
    name: "Lantai Vinyl",
    slug: "lantai-vinyl",
    image: "https://via.placeholder.com/400x250?text=Lantai+Vinyl",
    description: "Lantai sintetis yang nyaman dan mudah dipasang."
  },
  {
    id: 3,
    name: "Dinding WPC",
    slug: "dinding-wpc",
    image: "https://via.placeholder.com/400x250?text=Dinding+WPC",
    description: "Panel dinding elegan, ramah lingkungan dan tahan cuaca."
  },
  {
    id: 4,
    name: "Pintu PVC",
    slug: "pintu-pvc",
    image: "https://via.placeholder.com/400x250?text=Pintu+PVC",
    description: "Pintu ringan dan tahan air, cocok untuk kamar mandi."
  },
  {
    id: 5,
    name: "Furniture Custom",
    slug: "furniture-custom",
    image: "https://via.placeholder.com/400x250?text=Furniture+Custom",
    description: "Furniture sesuai ukuran & desain ruangan Anda."
  },
  {
    id: 6,
    name: "Lemari Built-in",
    slug: "lemari-built-in",
    image: "https://via.placeholder.com/400x250?text=Lemari+Built-in",
    description: "Lemari permanen yang menyatu dengan desain interior."
  },
  {
    id: 7,
    name: "Meja TV Minimalis",
    slug: "meja-tv",
    image: "https://via.placeholder.com/400x250?text=Meja+TV",
    description: "Meja TV fungsional dengan tampilan bersih dan modern."
  },
{
    id: 8,
    name: "Kitchen Set PVC",
    slug: "kitchen-set",
    image: "https://via.placeholder.com/400x250?text=Kitchen+Set",
    description: "Dapur modern dengan material tahan air dan mudah dibersihkan."
  },
  {
    id: 9,
    name: "Backdrop TV WPC",
    slug: "backdrop-tv",
    image: "https://via.placeholder.com/400x250?text=Backdrop+TV",
    description: "Panel TV dekoratif berbahan WPC tahan lama dan stylish."
  },
  {
    id: 10,
    name: "Partisi Ruangan",
    slug: "partisi-ruangan",
    image: "https://via.placeholder.com/400x250?text=Partisi",
    description: "Pemisah ruangan fleksibel untuk menambah privasi & estetika."
  },
  {
    id: 11,
    name: "Lighting Interior",
    slug: "lighting-interior",
    image: "https://via.placeholder.com/400x250?text=Lighting",
    description: "Pencahayaan estetik untuk mempercantik ruangan Anda."
  },
  {
    id: 12,
    name: "Langit-Langit PVC",
    slug: "langit-langit-pvc",
    image: "https://via.placeholder.com/400x250?text=Langit+Langit",
    description: "Solusi plafon tahan air, mudah dipasang, dan estetik."
  },
  {
    id: 13,
    name: "Rak Dinding PVC",
    slug: "rak-dinding",
    image: "https://via.placeholder.com/400x250?text=Rak+Dinding",
    description: "Rak gantung hemat ruang, kokoh dan mudah dibersihkan."
  },
  {
    id: 14,
    name: "Tangga PVC",
    slug: "tangga-pvc",
    image: "https://via.placeholder.com/400x250?text=Tangga+PVC",
    description: "Tangga dengan lapisan PVC tahan gores dan ringan."
  },
  {
    id: 15,
    name: "Panel Dinding 3D",
    slug: "panel-3d",
    image: "https://via.placeholder.com/400x250?text=Panel+3D",
    description: "Panel dinding dengan tekstur timbul untuk efek visual menarik."
  },
  {
    id: 16,
    name: "Dekorasi WPC",
    slug: "dekorasi-wpc",
    image: "https://via.placeholder.com/400x250?text=Dekorasi+WPC",
    description: "Aksen dekoratif dari bahan WPC untuk dinding atau plafon."
  },
  {
    id: 17,
    name: "Gorden Otomatis",
    slug: "gorden-otomatis",
    image: "https://via.placeholder.com/400x250?text=Gorden+Otomatis",
    description: "Tirai pintar yang bisa dibuka tutup lewat remote atau aplikasi."
  },
  {
    id: 18,
    name: "Sensor Gerak",
    slug: "sensor-gerak",
    image: "https://via.placeholder.com/400x250?text=Sensor+Gerak",
    description: "Sensor untuk otomatisasi lampu, alarm, dan perangkat rumah."
  },
  {
    id: 19,
    name: "Smart Lock Pintu",
    slug: "smart-lock",
    image: "https://via.placeholder.com/400x250?text=Smart+Lock",
    description: "Kunci pintu digital dengan sidik jari & aplikasi."
  },
  {
    id: 20,
    name: "Wallpaper Dinding",
    slug: "wallpaper-dinding",
    image: "https://via.placeholder.com/400x250?text=Wallpaper",
    description: "Motif beragam untuk mempercantik ruangan tanpa renovasi."
  },
  {
    id: 21,
    name: "Stiker Kaca Sandblast",
    slug: "stiker-sandblast",
    image: "https://via.placeholder.com/400x250?text=Stiker+Kaca",
    description: "Stiker kaca buram untuk privasi & dekorasi ruangan."
  },
  {
    id: 22,
    name: "Kanopi WPC",
    slug: "kanopi-wpc",
    image: "https://via.placeholder.com/400x250?text=Kanopi",
    description: "Pelindung teras dengan bahan kayu komposit tahan cuaca."
  },
  {
    id: 23,
    name: "Decking WPC",
    slug: "decking-wpc",
    image: "https://via.placeholder.com/400x250?text=Decking",
    description: "Lantai luar ruangan yang nyaman dipijak dan tahan cuaca ekstrem."
  },
  {
    id: 24,
    name: "Wall Cladding Eksterior WPC",
    slug: "wall-cladding-wpc",
    image: "https://via.placeholder.com/400x250?text=Wall+Cladding",
    description: "Pelapis dinding luar rumah untuk tampilan natural dan tahan lama."
  },
  {
    id: 25,
    name: "Pintu Geser PVC",
    slug: "pintu-geser-pvc",
    image: "https://via.placeholder.com/400x250?text=Pintu+Geser",
    description: "Pintu hemat tempat, tahan air, cocok untuk kamar mandi & pantry."
  },
  {
    id: 26,
    name: "Gazebo WPC",
    slug: "gazebo-wpc",
    image: "https://via.placeholder.com/400x250?text=Gazebo",
    description: "Struktur outdoor elegan untuk bersantai di taman atau halaman."
  },
  {
    id: 27,
    name: "Carport WPC & Kaca",
    slug: "carport-wpc",
    image: "https://via.placeholder.com/400x250?text=Carport",
    description: "Perlindungan kendaraan dengan gaya modern dan material kombinasi."
  },
  {
    id: 28,
    name: "Vertical Garden Wall PVC",
    slug: "vertical-garden-pvc",
    image: "https://via.placeholder.com/400x250?text=Taman+Vertikal",
    description: "Taman gantung dari PVC ringan dan mudah perawatan."
  },
  {
    id: 29,
    name: "Smart Lighting & Sensor",
    slug: "smart-lighting",
    image: "https://via.placeholder.com/400x250?text=Smart+Lighting",
    description: "Lampu otomatis & pengaturan cahaya berbasis sensor & timer."
  },
  {
    id: 30,
    name: "Smart AC Control",
    slug: "smart-ac",
    image: "https://via.placeholder.com/400x250?text=Smart+AC",
    description: "Atur suhu rumah dari mana saja lewat ponsel atau otomatisasi."
  },
  {
    id: 31,
    name: "Desain Interior Virtual 3D",
    slug: "desain-interior-3d",
    image: "https://via.placeholder.com/400x250?text=Desain+3D",
    description: "Lihat visualisasi proyek Anda sebelum eksekusi melalui model 3D."
  },
  {
    id: 32,
    name: "Konsultasi & Perencanaan Proyek",
    slug: "konsultasi-proyek",
    image: "https://via.placeholder.com/400x250?text=Konsultasi+Proyek",
    description: "Diskusi dan perencanaan proyek interior sesuai kebutuhan dan anggaran."
  }
];

export default services;