---
title: Personal Development Instances
menuText: Personal Instances
description: Learn about Personal Development Instances and how to use them.
menuOrder: 1
parent: Worklows
---

# Personal Instances

Personal instances are the place that you start working on your Cloud application. When you type cloud from your terminal, Serverless Cloud CLI instantiate a personal instance of the app in that folder. If the folder is empty and doesn't include a project, you'll be prompted to select an app or start a new app from templates.

Personal instances are temporary and will be teared down when you exit from Cloud Shell either by typing `quit`, `exit` or pressing `ctrl+c`. The personal instance URL that you see on Cloud Shell becomes inaccessible when you quit from Cloud Shell.

### Why Personal Instances Matter

The biggest problem of cloud development was the productivity loss while working on local due to mocking cloud resources or assuming their behaviours. The feedback loop generally contains "develop -> deploy -> test issues -> see error" steps that are repeated numerously. With Serverless Cloud, it's possible to develop against Cloud. The changes you make are synced to Cloud instantly (less than a second depending on the change). In this way, you can be sure that your code will behave same on production as it behaves in your personal instance.
