# Blockfix AI Design Service

Backend service untuk fitur AI Room Design di aplikasi Blockfix. Service ini menyediakan konsultasi desain interior otomatis menggunakan AI.

## 🚀 Quick Start

### Windows Command Prompt
```cmd
# Jalankan script otomatis
run_server.bat
```

### PowerShell
```powershell
# Jalankan script PowerShell
.\run_server.ps1
```

### Manual Setup
```cmd
# 1. Buat virtual environment
python -m venv venv

# 2. Aktivasi virtual environment
venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Jalankan server
python app.py
```

## 📋 Prerequisites

- Python 3.8+ (Recommended: Python 3.11)
- pip (Python package manager)

## 🔧 Installation

1. **Install Python** (jika belum ada):
   - Download dari [python.org](https://www.python.org/downloads/)
   - Pastikan centang "Add Python to PATH" saat instalasi

2. **Clone/Download project** dan masuk ke folder `backend-ai`

3. **Jalankan setup script**:
   - Windows: Double-click `run_server.bat`
   - PowerShell: `.\run_server.ps1`

## 🌐 API Endpoints

### Base URL: `http://localhost:5000`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service info dan status |
| `/health` | GET | Health check |
| `/api/design` | POST | AI design consultation |

### Design API Usage

**Request:**
```json
{
  "text": "Saya ingin mendesain kamar tidur",
  "sender": "user",
  "image": null
}
```

**Response:**
```json
{
  "reply": "Saya melihat Anda ingin mendesain kamar tidur...",
  "timestamp": 1703123456.789,
  "processed": true
}
```

## 🧪 Testing

```cmd
# Jalankan test suite
python test_service.py

# Atau manual test dengan curl
curl -X POST http://localhost:5000/api/design \
  -H "Content-Type: application/json" \
  -d '{"text":"test message","sender":"user"}'
```

## 🎯 Features

- ✅ Konsultasi desain berdasarkan jenis ruangan
- ✅ Estimasi biaya material
- ✅ Rekomendasi produk
- ✅ Analisis foto ruangan (basic)
- ✅ Katalog material interaktif
- ✅ Response contextual dan smart

## 🔍 Troubleshooting

### Python tidak ditemukan
```cmd
# Cek instalasi Python
python --version

# Jika error, install Python dari python.org
# Restart terminal setelah instalasi
```

### Permission Error
```cmd
# Jalankan Command Prompt sebagai Administrator
# Atau gunakan:
python -m pip install --user -r requirements.txt
```

### Port sudah digunakan
```cmd
# Cek proses yang menggunakan port 5000
netstat -ano | findstr :5000

# Kill proses jika perlu
taskkill /PID <process_id> /F
```

## 📁 Project Structure

```
backend-ai/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── run_server.bat        # Windows batch script
├── run_server.ps1        # PowerShell script
├── test_service.py       # Test suite
├── setup_guide.md        # Detailed setup guide
├── README.md             # This file
├── routes/
│   └── design_routes.py  # API routes
└── controllers/
    └── design_controller.py  # Business logic
```

## 🔄 Development

```cmd
# Install development dependencies
pip install -r requirements.txt

# Format code
black .

# Lint code
flake8 .

# Run tests
pytest
```

## 📞 Support

Jika mengalami masalah:
1. Baca `setup_guide.md` untuk panduan detail
2. Cek `troubleshooting` section di atas
3. Pastikan Python dan pip terinstall dengan benar
4. Restart terminal setelah install Python

## 🚀 Production Deployment

Untuk production, gunakan WSGI server seperti Gunicorn:

```cmd
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
