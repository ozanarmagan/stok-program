#!/bin/bash
echo "Backend Deployment Started"


git clone https://github.com/ozanarmagan/stok-program.git

cd stok-program/backend

docker build -t stok-backend .
docker run -d -p 8080:8080 stok-backend 
