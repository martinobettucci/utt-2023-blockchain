# How to run & deploy
docker build . -t hhdocker && docker rm -f myhd && docker run -it -d -v $PWD/artifacts:/usr/src/app/artifacts -p 8545:8545 --name myhd hhdocker; sleep 5; docker exec -it myhd /bin/sh -c "cd /usr/src/app; yarn deploy:local"

# How to test execution
bash client.sh
