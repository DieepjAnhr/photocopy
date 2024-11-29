#!/bin/bash

CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

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

  # nest generate resource $name modules

  # This will generate module with the provided name
  nest generate module $name modules

    # This will resolver controller with the provided name
  nest generate resolver $name modules

  # This will generate controller with the provided name
  # nest generate controller $name modules

  # This will generate the service with the provided name
  nest generate service $name modules

  # touch $CUR_DIR/src/modules/$name/$name.repository.ts

  mkdir $CUR_DIR/src/modules/$name/dto
  touch $CUR_DIR/src/modules/$name/dto/create-$name.dto.ts
  touch $CUR_DIR/src/modules/$name/dto/update-$name.dto.ts

  mkdir $CUR_DIR/src/modules/$name/entity
  touch $CUR_DIR/src/modules/$name/entity/$name.entity.ts
}

# We check if the first positional parameter is "generate"
if [ "$1" == "init" ]; then
  initNestProject $2
elif [ "$1" == "generate" ]; then
  # if it is, we call the function with the second positional parameter as argument
  generateNestModule $2
fi

# https://github.com/Ho-s/NestJS-GraphQL-TypeORM-PostgresQL/tree/main