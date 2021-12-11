---
title: CI/CD
menuText: CI/CD
description: Use a CI/CD provider to test and deploy your Serverless Cloud applications.
menuOrder: 6
parent: Workflows
---

# CI/CD

You can use a CI/CD provider to test and deploy your Serverless Cloud applications.

First create an access key in the Serverless dashboard by visiting https://cloud.serverless.com/{your-org-name}/settings/accessKeys, and add it as an environment variable named `SERVERLESS_ACCESS_KEY` in your CI/CD environment.

You can then use the `cloud test` command to test your code, and the `cloud deploy` command to deploy to a stage such as `prod`.

# GitHub Actions Example

Below is a simple example of an automated deployment workflow using GitHub actions.

```yaml
# .github/workflows/deploy.yml

name: deploy
on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    env:
      SERVERLESS_ACCESS_KEY: ${{ secrets.SERVERLESS_ACCESS_KEY }}
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 16
      - run: npm ci
      - run: npx cloud test
      - run: npx cloud deploy prod
```
