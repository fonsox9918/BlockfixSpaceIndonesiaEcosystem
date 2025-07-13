@echo off
echo Starting Backend AI Server Setup...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed! Please follow setup_guide.md to install Python first.
    pause
    exit /b 1
)

REM Check if venv exists, create if not
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing dependencies...
python -m pip install -r requirements.txt

REM Run the server
echo Starting Flask server...
python app.py

pause
