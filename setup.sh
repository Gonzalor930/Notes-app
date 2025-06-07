#!/bin/bash

echo "Starting notes app setup..."

echo "Setting up backend..."
cd backend || exit
./mvnw clean install
if [ $? -ne 0 ]; then
  echo "Backend build failed"
  exit 1
fi

echo "Starting backend on http://localhost:8080"
./mvnw spring-boot:run &
BACKEND_PID=$!

cd ..

echo "Setting up frontend..."
cd frontend || exit
npm install
if [ $? -ne 0 ]; then
  echo "Frontend install failed"
  exit 1
fi

echo "Starting frontend on http://localhost:5173"
npm run dev &
FRONTEND_PID=$!

echo "Setup complete. Visit http://localhost:5173 to use the app."

wait $BACKEND_PID $FRONTEND_PID
