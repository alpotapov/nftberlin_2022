#!/bin/bash

# (cd ../../ && yarn deploy --network ropsten)

docker build --tag alpotapov/gapl_marketplace:latest --platform linux/amd64 .

docker tag alpotapov/gapl_marketplace registry.heroku.com/gapl-app/web

docker push registry.heroku.com/gapl-app/web