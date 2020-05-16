#!/bin/bash


# Step 1: Build and publish images to Docker Hub
docker build -t anatoliygatt/cicd-docker-nginx:$TRAVIS_TAG -t anatoliygatt/cicd-docker-nginx ./nginx
docker build -t anatoliygatt/cicd-docker-api:$TRAVIS_TAG -t anatoliygatt/cicd-docker-api ./api
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
docker push anatoliygatt/cicd-docker-nginx
docker push anatoliygatt/cicd-docker-api
docker logout


# Step 2: Install and configure Google Cloud SDK
openssl aes-256-cbc -K $encrypted_9f3b5599b056_key -iv $encrypted_9f3b5599b056_iv -in service-account.json.enc -out service-account.json -d
curl https://sdk.cloud.google.com | bash > /dev/null;
source $HOME/google-cloud-sdk/path.bash.inc
gcloud components update kubectl
gcloud auth activate-service-account --key-file service-account.json
gcloud config set project cicd-docker
gcloud config set compute/zone europe-west2-a
gcloud container clusters get-credentials cicd-docker-cluster


# Step 3: Apply k8s configuration
kubectl apply -f k8s
kubectl set image deployment/api-deployment api=anatoliygatt/cicd-docker-api:$TRAVIS_TAG