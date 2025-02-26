import { Client } from "https://deno.land/x/elasticsearch@v8.6.2/mod.ts";

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

const client = new Client({ node: "http://localhost:9200" });
const index = "ci-jobs-backend";

export async function reCreateJobIndex() {
    await client.indices.create({
        index,
        body: { mappings: { properties: jobSchema } },
    });
}

export async function addJob(job: Job) {
    console.log("Adding job: ",job);
    await client.documents.upsert({
        target: index,
        _id: String(job.id.replace(/\W/g, "_")),
        body: job,
    });
}
