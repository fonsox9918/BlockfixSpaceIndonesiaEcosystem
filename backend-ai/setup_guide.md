# Setup Guide for Backend AI Service

## 1. Install Python
1. Download Python 3.11 for Windows from the official website:
   https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe
   
2. During installation:
   - Check "Add Python to PATH"
   - Click "Install Now"
   - Wait for installation to complete

## 2. Verify Installation
Open a new Command Prompt and run:
```cmd
python --version
```

## 3. Set up Virtual Environment
```cmd
# Navigate to backend-ai directory
cd backend-ai

# Create virtual environment
python -m venv venv

# Activate virtual environment
# For CMD:
venv\Scripts\activate
# For PowerShell:
.\venv\Scripts\Activate.ps1
# For Git Bash:
source venv/Scripts/activate
```

## 4. Install Dependencies
```cmd
pip install -r requirements.txt
```

## 5. Run the Application
```cmd
# Make sure you're in the backend-ai directory
python app.py
```

## Troubleshooting
- If Python is not recognized, restart your terminal after installation
- If pip is not found, try `python -m pip install -r requirements.txt`
- For permission errors, run Command Prompt as Administrator
