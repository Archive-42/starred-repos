---
title: Get Started
menuText: Get Started
firstChildMenuText: Quick Start
description: Here's the guide to get started with Serveless Cloud in seconds
menuOrder: 2
has_children: true
has_toc: false
---

# Quick Start

It literally takes seconds to have your first application running on Serverless Cloud. After signup to Serverless Cloud from [here](https://cloud.serverless.com/?view=register), you'll see two options to get started. 

- [Fork an public app and start working on it](#fork-an-app)
- [Build your own app using templates](#build-your-own-app)


## Fork an App

You can start by playing with the code of an existing app with this version. You can select one of the applications built by our team and our community and fork it to your Serverless Cloud Account by following the below steps: 

Select one template application and fork it to your account: 

<img width="367" alt="ForkAnApp" src="https://user-images.githubusercontent.com/85096820/139436453-e51ce71b-86fe-495d-ab1d-cd90e8cdd797.png">




Some template applications require you to assign values to some of the parameters and won't work properly until you pass this parameter.

<img width="364" alt="ForkAnAppParameter" src="https://user-images.githubusercontent.com/85096820/139436501-ffa09ae3-5f92-4ad3-8ff7-8eae6eca2539.png">



See the steps required to start working on your local when fork operation is completed. The first step to install Serverless Cloud from npm.

```
npm i -g @serverless/cloud@latest
```

Clone the application to your local and start developing against Cloud: 

```
cloud clone @<yourUserName>/<appName> --login <loginSlug>
```

The app is copied into a new directory with the app name, follow the instructions on CLI to start working on it. 

Note that this operation may fail with "npm install exited with code 1" error. In such cases, 

- Get into the directory with the app name by running `cd <appName>` 
- Run `npm i` to install dependencies yourself
- Type `cloud` to start working on your project. 

When you type `cloud`, you'll enter the interactive Cloud Shell where you can see your personal instance URL, and see the logs that the application prints. Make code changes in your application and see how fast it's synced into a your application running on Cloud. 
 
## Build Your Own App

If you want to start with our templates and build your own application from scratch, this option is for you. Follow the instructions provided on Serverless Cloud Dashboard as follows:

Install globally from npm...

```
npm i -g @serverless/cloud@latest
```

Create a new directory...

```
mkdir my-cloud && cd my-cloud
```

Initialize a sample app and start developing

```
cloud --login <loginSlug> 
```

Select one of the app templates that lets you build with Javascript or Typescript integrated with known SPA libraries. Give a name to your app and start developing. 

Visit the url, see live logs, make changes, and watch them quickly deploy to your own **personal instance**. Cloud Shell helps you write commands and go back in command history.


**Next:** [Serverless Cloud Concepts](/cloud/docs/get-started/concepts)
