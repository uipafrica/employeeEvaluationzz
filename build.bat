@echo off
echo Building Employee Evaluation System for production...

REM Install backend dependencies if needed
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

REM Install frontend dependencies if needed
if not exist "client\node_modules" (
    echo Installing frontend dependencies...
    cd client
    call npm install
    cd ..
)

REM Build the React app
echo Building React app...
cd client
call npm run build
cd ..

echo Build completed successfully!
echo The frontend is now in client/build folder
echo Start the server with: npm run start:prod

