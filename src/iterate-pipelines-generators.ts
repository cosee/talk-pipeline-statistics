import { loadSettings } from "./common/settings.ts";

const { gitlabToken, gitlabURL, gitlabProjectId } = loadSettings();

function fetchGitlab(url: string) {
  return fetch(gitlabURL + url, {
    headers: {
      "PRIVATE-TOKEN": gitlabToken,
    },
  });
}

// https://docs.gitlab.com/ee/api/jobs.html
async function* loadJobs({ page = 1, perPage = 2 } = {}) {
  const response = await fetchGitlab(
    `/api/v4/projects/${gitlabProjectId}/jobs?page=${page}&perPage=${perPage}`,
  );

  const jobs = await response.json();
  if (jobs.length === 0) {
    return "DONE";
  }
  for (const job of jobs) {
    yield job;
  }
}

async function* loadAllJobs(limit = 1000) {
  for (let page = 1; page <= limit; page++) {
    const result = yield* loadJobs({ page });
    if (result === "DONE") return;
  }
}

for await (const job of loadAllJobs()) {
  console.log(job);
}
