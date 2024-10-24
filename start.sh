#!/bin/bash

SHELL_PROFILE_FILE=~/.bashrc

handle_directory() {
    cd $CUR_DIR/$1 || { echo "Error: $1 directory not found in $CUR_DIR"; }
    [ -s .nvmrc ] &&  nvm use || { echo "Warning: .nvmrc not found. Using the currently active Node.js version"; }
    npm install || { echo "Error: npm install failed for $1"; }
}

CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

install() {
    handle_directory "client"
    handle_directory "server"
}

build() {
    handle_directory "client" && npm run build
    handle_directory "server" && npm run build
}

if [ -z "$1" ]; then
    echo "No command provided. Possible commands are: 'install' or 'build'"
    exit 1
fi

if [ "$1" == "install" ]; then
    command -v nvm >/dev/null 2>&1 || { echo >&2 "nvm is not installed. Aborting."; }
    install
elif [ "$1" == "build" ]; then
    command -v nvm >/dev/null 2>&1 || { echo >&2 "nvm is not installed. Aborting."; }
    build
else
    echo "Command $1 undefined. Possible commands are: 'install' or 'build'"
fi