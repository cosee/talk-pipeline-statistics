function getRequiredEnvVar(name: string): string {
    const value = Deno.env.get(name);
    if (!value) {
        throw new Error(`${name} is not set in the environment variables`);
    }
    return value;
}

export function loadSettings() {
    return {
        get gitlabURL() {
            return getRequiredEnvVar("GITLAB_URL");
        },
        get gitlabToken() {
            return getRequiredEnvVar("GITLAB_TOKEN");
        },
        get gitlabProjectId() {
           return  getRequiredEnvVar("GITLAB_PROJECT_ID");
        },
        get gitlabProjectPath() {
            return getRequiredEnvVar("GITLAB_PROJECT_PATH");
        },
        get gitlabProjectMainRef() {
            return getRequiredEnvVar("GITLAB_PROJECT_MAIN_REF");
        },
    };
}
