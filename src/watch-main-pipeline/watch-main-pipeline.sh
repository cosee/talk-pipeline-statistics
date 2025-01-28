cd "$( dirname "$( readlink -f "$0" )" )"

watch deno run --allow-env --allow-net ./show-main-pipeline.ts