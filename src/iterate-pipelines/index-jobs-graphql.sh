#!/bin/bash

cd "$( dirname "$( readlink -f "$0" )" )"

deno run --allow-import --allow-net --allow-env ./index-jobs-graphql.ts
