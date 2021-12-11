---
title: Promoting Stages
menuText: Promoting Stages
description: Learn how to promote your application to other stages.
menuOrder: 6
parent: Worklows
---

# Promoting Stages

For many cases, there's a stage that mimics the production. Developers push their changes and then run manual GUI/end-to-end tests on it before pushing to production. In such cases, "promotion" is used to simply copying the code from the mimicing stage to production. Here's an example flow that shows how promoting between stages works on Serverless Cloud:

```
# Start your project from Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically and quit Cloud Shell
> quit

# Run your tests before you push it to a permanent stage.
> cloud test

# Share your work with your colleagues by creating a preview instance that has the same code and data with your personal instance
> cloud share

# Manual tests are okay so we can let CI run its tasks and push the app to staging to run GUI tests
> cloud deploy staging

# GUI tests are okay. Let's promote the code to prod from staging
> cloud promote staging prod
```
