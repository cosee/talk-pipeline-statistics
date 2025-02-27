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


