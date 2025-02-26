cd "$( dirname "$( readlink -f "$0" )" )"

watch deno run --allow-env --allow-net --allow-run ./show-main-pipeline.ts