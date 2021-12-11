---
title: Serverless Cloud Concepts
menuText: Serverless Cloud Concepts
description: Learn about Serverless Cloud's concepts with interfaces Dashboard.
menuOrder: 1
parent: Quick Start
---

# Serverless Cloud Concepts

Serverless Cloud introduces a new way to develop applications against Cloud by collaborating with your colleagues. In this page, we'll briefly mention the concepts around Serverless Cloud.

## Apps and Instances

Serverless Cloud allows you to build **APPS** within your team's **ORGANIZATION**. You can create as many apps as you want for different use cases or applications. Serverless Cloud provides the preview build of each app via instances. An app can have multiple instances and each **instance** is completely separate from all the other **instances** in an **app**, and even store their own copy of the data. The first instance that you start to use immediately is your **personal instance** that syncs your changes to cloud as you code. There are also different type of instances like preview instances, test instances and stages. See [here](/cloud/docs/apps/apps-instances) for more information.

## Cloud CLI

The Serverless Cloud CLI is a command-line interface (CLI) that provides a simple, unified interface to Serverless Cloud. Note that our CLI requires Node.js v14 and higher. Check your node version by running `node -v` from your terminal. The Serverless Cloud CLI has several modes to optimize experience in different situations:

- **Interactive Mode** (a.k.a Cloud Shell) allows developers to connect to their Personal Instance from their local IDE, auto sync code changes, stream logs, and run common commands to manager their development workflow. This mode is opened when you type `cloud` from your terminal.
- **Standard Mode** allows developers to run specific commands to manage apps and workflows on Serverless Cloud. You should be logged in to CLI by running `cloud login` to use standard mode.
- **Headless Mode** is used to manage the CI/CD operations on Serverless Cloud with an Access Token received from Cloud Dashboard.

See [here](/cloud/docs/cli) for more information.

## Serverless APIs

Serverless Cloud lets developers to build cloud-native REST and GraphQL APIs. You can either take advantage of Serverless Cloud's native `api` interface or [bring your existing API](/cloud/docs/apps/frameworks) written in Express.js, Koa or another framework.

See [here](/cloud/docs/apps/api) for more information.

## Serverless Data

Serverless Data is a powerful, scaleable datastore that's built-in to Serverless Cloud. Every instance on Serverless Cloud has its isolated, completely independent copy of application data powered by Serverless Data. In order to use Serverless Data programmatically, `data` interface with `get`, `set`, and `remove` commands is used. You can use these comamnds to interact with application data in single-digit-ms response times.

You can also seed data to your **personal instance** from a seed file (data.json by default), export and import data from your personal instance. See [here](/cloud/docs/apps/data) for more information.

## Serverless Cloud Params/Secrets

Serverless Cloud lets you define parameters/secrets to inject on your application on runtime. Parameters can be defined on Serverless Cloud Dashboard for organization or app level and can be overriden for specific instance. For example; you can define your development `STRIPE_TOKEN` app-wide and override it with a production value for your `production` stage. You can use `params` interface to read params params programmatically from your application.

## Serverless Schedulers

Using `schedule` interface, you can define periodic tasks on Serverless Cloud. This is particularly useful when you have to run a batch job or make a periodic check. See [here](/cloud/docs/apps/schedule) for more information.

## Serverless Cloud Dashboard

Serverless Cloud Dashboard lets developers manage their apps and instances, create/edit params, monitor apps, make their apps forkable, and manage their developer and organizational profiles.
