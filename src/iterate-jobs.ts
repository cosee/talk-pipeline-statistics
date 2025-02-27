#!/usr/bin/env -S deno run --allow-env --allow-net --allow-run

import { loadSettings } from "./common/settings.ts";

const { gitlabToken, gitlabURL, gitlabProjectId } = loadSettings();

const MAX_PAGES = 1000;

// https://docs.gitlab.com/ee/api/jobs.html
for (let i = 0; i < MAX_PAGES; i++) {
  const response = await fetch(
    `${gitlabURL}/api/v4/projects/${gitlabProjectId}/jobs?page=${i}&perPage=10`,
    { headers: { "PRIVATE-TOKEN": gitlabToken } },
  );
  const responseBody = await response.json();
  if (!responseBody.length) {
    console.log("done", responseBody);
    Deno.exit();
  }
  for (const job of responseBody) {
    doSomething(job)
  }
}


function doSomething(job: unknown) {
  console.log("doing something", job);
}