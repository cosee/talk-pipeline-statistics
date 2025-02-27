# The truth about your CI pipeline

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



Vorkenntnisse:
Basic knowledge about JavaScript. Basic knowledge of what CI/CD is and how it works. Basic knowledge of HTTP and GraphQL

Lernziele:
How can I use GitLab and GitHub APIs, JavaScript and open source tools to pin-point problems in my CI pipeline.

Bemerkungen:
I can give this talk in English and German. The only relation to JavaScript is the fact that I used Deno to extract CI job statistics from GitLab, but I think the topic might be interesting for this conference anyway.


# Try the demo

Set the appropriate environment variables:

```
export GITLAB_URL=https://gitlab.com
# Open https://${GITLAB_URL}/-/user_settings/personal_access_tokens
export GITLAB_TOKEN=your-gitlab-token
export GITLAB_PROJECT_ID=123456
```