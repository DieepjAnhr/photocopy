#!/bin/bash

initNestProject() {
  local name=$1

  npm i -g @nestjs/cli
  nest new --strict $name
}

initNestGraphQL() {
  npm i @apollo/server graphql @nestjs/apollo @nestjs/graphql
}

generateNestModule() {
  local name=$1

  # This will generate module with the provided name
  nest generate module $name modules

    # This will resolver controller with the provided name
  nest generate resolver $name modules

    # This will generate controller with the provided name
  # nest generate controller $name modules

    # This will generate the service with the provided name
  nest generate service $name modules
}

# We check if the first positional parameter is "generate"
if [ "$1" == "init" ]; then
  initNestProject $2
elif [ "$1" == "generate" ]; then
  # if it is, we call the function with the second positional parameter as argument
  generateNestModule $2
fi