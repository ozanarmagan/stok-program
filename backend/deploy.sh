#!/bin/bash
echo "Backend Deployment Started"

rm -rf ./stok-program

git clone https://github.com/ozanarmagan/stok-program.git

cd stok-program/backend

docker rm -f stok-backend
docker build -t stok-backend .
docker run --name=stok-backend -d -p 8080:8080 stok-backend 