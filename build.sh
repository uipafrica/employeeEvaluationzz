#!/bin/bash

echo "Building Employee Evaluation System for production..."

# Install backend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Install frontend dependencies if needed
if [ ! -d "client/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

# Build the React app
echo "Building React app..."
cd client && npm run build && cd ..

echo "Build completed successfully!"
echo "The frontend is now in client/build folder"
echo "Start the server with: npm run start:prod"

