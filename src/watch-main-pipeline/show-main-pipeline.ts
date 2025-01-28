import { loadSettings } from "../common/settings.ts";

const { gitlabToken, gitlabURL } = loadSettings();

// https://docs.gitlab.com/ee/api/pipelines.html#list-project-pipelines
const response = await fetch(
  gitlabURL +
    `/api/v4/projects/865/pipelines?per_page=2&ref=main`,
  {
    headers: {
      "PRIVATE-TOKEN": gitlabToken,
    },
  },
);

console.log(await response.json());
