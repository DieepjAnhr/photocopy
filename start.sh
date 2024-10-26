#!/bin/bash
# server ip = 103.186.147.227

CUR_DIR="$(pwd)"

cd ${CUR_DIR}/client
npm run build
pm2 delete photocopy-client
pm2 start "npx serve@latest out" --name photocopy-client