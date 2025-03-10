#!/usr/bin/env -S watch -n 60 deno run --allow-env --allow-net --allow-run --allow-read=./

import { getLastPipelineStatus } from "./pipeline-monitor/getLastPipelineStatus.ts";
import { getImage } from "./pipeline-monitor/getImage.ts";

const lastFinishedStatus = await getLastPipelineStatus("finished");
const lastStatus = await getLastPipelineStatus();
const image = getImage(lastStatus, lastFinishedStatus);

new Deno.Command("osascript", {
    args: [
        "-e",
        `tell application "System Events" to tell every desktop to set picture to "${image}" as POSIX file`,
    ],
}).outputSync();
