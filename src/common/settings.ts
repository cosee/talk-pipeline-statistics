function getRequiredEnvVar(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`${name} is not set in the environment variables`);
  }
  return value;
}

export function loadSettings() {
  const gitlabURL = getRequiredEnvVar("GITLAB_URL");
  const gitlabToken = getRequiredEnvVar("GITLAB_TOKEN");
  const gitlabProjectId = getRequiredEnvVar("GITLAB_PROJECT_ID");
  const gitlabProjectPath = getRequiredEnvVar("GITLAB_PROJECT_PATH");
  return { gitlabURL, gitlabToken, gitlabProjectId, gitlabProjectPath };
}
