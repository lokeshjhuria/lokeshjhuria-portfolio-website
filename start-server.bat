@echo off
echo Starting Portfolio Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if package.json exists
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please make sure you're in the correct directory.
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)

REM Start the server
echo Starting server...
echo.
echo ================================
echo   Portfolio Server Starting...
echo ================================
echo.
echo Server will be available at:
echo   http://localhost:3000
echo.
echo API Endpoints:
echo   Health: http://localhost:3000/api/health
echo   Portfolio: http://localhost:3000/api/portfolio
echo   Contact: http://localhost:3000/api/contact
echo.
echo Press Ctrl+C to stop the server
echo ================================
echo.

npm start

pause
