docker build -t anatoliygatt/cicd-docker-nginx:$TRAVIS_TAG ./nginx
docker build -t anatoliygatt/cicd-docker-api:$TRAVIS_TAG ./api
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
docker push anatoliygatt/cicd-docker-nginx:$TRAVIS_TAG
docker push anatoliygatt/cicd-docker-api:$TRAVIS_TAG