# Why is my pipeline so slow? :snail:

Is my CI pipeline getting slower? It feels like more end-to-end tests are failing
lately. Since when is deployment taking so long?

Have questions like these bothered you before? You are probably not alone.
But what can we do about it? Well, we could add some facts and measurements
to our gut-feeling and prove that something is not right.

Luckily, there are APIs that we can leverage to get the timing and 
success rates of our CI jobs.

In this talk we will show how we can use a simple Deno script to retrieve that data,
pipe into ElasticSearch and visualize it with Kibana, so that we can see what is 
really going on.

## About the author

Nils has been writing code since he was a child and has been working as a web-developer since 2007.
His passion is clean code, automated testing, CI/CD and TypeScript.

# Try the demo

* Install deno
* Create an access token at https://gitlab.com/-/user_settings/personal_access_tokens
* Set the appropriate environment variables and run

```bash
export GITLAB_URL=https://gitlab.com
export GITLAB_PROJECT_PATH=example/example-project
export GITLAB_TOKEN=your-gitlab-token
export GITLAB_PROJECT_ID=123456

# Show whether the main pipeline was a success or not
./src/show-main-pipeline.ts 

# Iterate and dump jobs to console (via REST)
./src/iterate-jobs-r.ts

# Iterate and dump jobs to console (via GraphQL)
./src/iterate-jobs-g.ts

# Push jobs to elastic search
docker compose up -d
./src/index-jobs-g.ts

```

## Links & Docs:

- Deno: https://deno.com/
- Deno GraphQL: https://deno.land/x/graphql_request@v4.1.0
- Deno ElasticSearch (deprecated): https://deno.land/x/elasticsearch@v8.6.2
- ElasticSearch docs: https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
- ElasticSearch schema mappings: https://www.elastic.co/guide/en/elasticsearch/reference/current/explicit-mapping.html
- Kibana Docs: https://www.elastic.co/guide/en/kibana/current/index.html
- GitLab REST API: https://docs.gitlab.com/api/rest/
- GitLab GraphQL API: https://docs.gitlab.com/api/graphql/
- GitLab GraphQL explorer: https://gitlab.com/-/graphql-explorer