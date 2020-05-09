#!/bin/bash
set -ev
if [ "$TRAVIS_BRANCH" = "master"] && [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_TAG}" != "" ]; then
  docker build -t anatoliygatt/cicd-docker-nginx:$TRAVIS_TAG -t anatoliygatt/cicd-docker-nginx ./nginx
  docker build -t anatoliygatt/cicd-docker-api:$TRAVIS_TAG -t anatoliygatt/cicd-docker-api ./api
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
  docker push anatoliygatt/cicd-docker-nginx
  docker push anatoliygatt/cicd-docker-api
fi