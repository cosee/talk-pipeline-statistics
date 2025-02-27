#!/usr/bin/env -S deno run --allow-env --allow-net --allow-run

// deno-lint-ignore-file no-explicit-any
import { loadSettings } from "./common/settings.ts";
const { gitlabURL, gitlabToken, gitlabProjectPath } = loadSettings();

import {
    gql,
    GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/src/index.ts";
import { Client } from "https://deno.land/x/elasticsearch@v8.6.0/mod.ts";

const index = "ci-jobs-frontend";

export interface Job {
    id: string;
    name: string;
    createdAt: string;
    startedAt: string;
    duration: number;
    status: string;
}

export const jobSchema = {
    id: { type: "keyword", store: true },
    name: { type: "keyword", store: true },
    createdAt: { type: "date" },
    startedAt: { type: "date" },
    duration: { type: "long" },
    webPath: { type: "keyword", store: true },
    status: { type: "keyword", store: true },
};

const esClient = new Client({ node: "http://localhost:9200" });

export async function createJobIndex() {
    await esClient.indices.create({
        index,
        body: { mappings: { properties: jobSchema } },
    });
}

export async function addJob(job: Job) {
    console.log("Adding job: ", job);
    await esClient.documents.upsert({
        target: index,
        _id: String(job.id.replace(/\W/g, "_")),
        body: job,
    });
}

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

await createJobIndex();
console.log("Job Index Created");

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
        await addJob(edge.node);
    }
    after = response.project.jobs.pageInfo.endCursor;
    hasNextPage = response.project.jobs.pageInfo.hasNextPage;
}
