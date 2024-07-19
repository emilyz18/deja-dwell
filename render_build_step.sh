#!/bin/bash

echo "Build script"

cd server || exit
npm install
cd ../vite-project || exit
npm install
npm run build:ui
