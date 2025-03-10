import { loadSettings } from "../common/settings.ts";

const { gitlabToken, gitlabURL, gitlabProjectId, gitlabProjectMainRef } = loadSettings();

export async function getLastPipelineStatus(scope?: "finished") {
    const params = new URLSearchParams({
        per_page: '1',

        ref: gitlabProjectMainRef
    })

    if (scope != null) {
        params.append("scope", scope)
    }
    const url =
        `${gitlabURL}/api/v4/projects/${gitlabProjectId}/pipelines?${params.toString()}`;

    console.log("fetch from: "+ url)
    const response = await fetch(url, {
        headers: {
            "PRIVATE-TOKEN": gitlabToken,
        },
    })
    let body = await response.json();
    console.log("response:", body)
    return body[0].status;
}
