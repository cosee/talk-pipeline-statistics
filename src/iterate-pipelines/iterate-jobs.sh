cd "$( dirname "$( readlink -f "$0" )" )"

deno run --allow-env --allow-net  ./iterate-pipelines.ts