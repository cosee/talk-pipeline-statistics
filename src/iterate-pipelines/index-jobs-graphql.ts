// deno-lint-ignore-file no-explicit-any
import { loadSettings } from "../common/settings.ts";
const { gitlabURL, gitlabToken, gitlabProjectPath } = loadSettings();

import {
    gql,
    GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/src/index.ts";
import {addJob, reCreateJobIndex} from "./elasticsearch.ts";

const jobsQuery = gql`
    query ProjectJobs($fullProjectPath: ID!, $after: String) {
        project(fullPath: $fullProjectPath) {
            jobs(after: $after, first: 10) {
                count
                pageInfo {
                    endCursor
                    hasNextPage
                }
                edges {
                    node {
                        id
                        name
                        duration
                        startedAt
                        createdAt
                        status
                        webPath
                    }
                }
            }
        }
    }
`;

await reCreateJobIndex()
console.log("Job Index Created")

const client = new GraphQLClient(`${gitlabURL}/api/graphql`, {
    headers: {
        Authorization: `Bearer ${gitlabToken}`,
    },
});

let after: string | null = null;
let hasNextPage = true;

while (hasNextPage) {
    const response: any = await client.request(jobsQuery, {
        fullProjectPath: gitlabProjectPath,
        after: after,
    });

    for (const edge of response.project.jobs.edges) {
        await addJob(edge.node)
    }
    after = response.project.jobs.pageInfo.endCursor;
    hasNextPage = response.project.jobs.pageInfo.hasNextPage;
}
