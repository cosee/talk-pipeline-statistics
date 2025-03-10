#!/usr/bin/env -S deno run --allow-env --allow-net --allow-run

// deno-lint-ignore-file no-explicit-any
import { loadSettings } from "./common/settings.ts";
const { gitlabURL, gitlabToken, gitlabProjectPath } = loadSettings();

import {
    gql,
    GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/src/index.ts";

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
                        status
                    }
                }
            }
        }
    }
`;

const client = new GraphQLClient(`${gitlabURL}/api/graphql`, {
    headers: {
        Authorization: `Bearer ${gitlabToken}`,
    },
});

let hasNextPage = true
let after : string | null = null


while(hasNextPage) {
    const response: any = await client.request(jobsQuery, {
        fullProjectPath: gitlabProjectPath,
        after: after
    })
    hasNextPage = response.project.jobs.pageInfo.hasNextPage
    after = response.project.jobs.pageInfo.after

    for (const edge of response.project.jobs.edges) {
        console.log(edge.node)
    }

}
