@echo off
echo ======================================
echo FAANG Resume Sprint - Quick Setup
echo ======================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo. Node.js detected
node -v

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X npm is not installed
    pause
    exit /b 1
)

echo. npm detected
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Installation complete!
    echo.
    echo ======================================
    echo Quick Start Commands:
    echo ======================================
    echo.
    echo   npm run dev      - Start development server
    echo   npm run build    - Build for production
    echo   npm start        - Start production server
    echo   npm run lint     - Run code linting
    echo.
    echo ======================================
    echo Documentation:
    echo ======================================
    echo.
    echo   README.md        - Main documentation
    echo   SETUP.md         - Detailed setup guide
    echo   DEPLOYMENT.md    - Deployment instructions
    echo.
    echo ======================================
    echo Ready to start!
    echo Run: npm run dev
    echo Then visit: http://localhost:3000
    echo ======================================
) else (
    echo.
    echo Installation failed
    echo Please check the error messages above
    pause
    exit /b 1
)

pause
