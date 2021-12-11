---
title: Public and Forkable Apps
menuText: Public and Forkable Apps
description: Learn how you can manage your public and forkable apps
menuOrder: 2
parent: Public/Forkable Apps
---

# Public and Forkable Apps 

Serverless Cloud lets you share the apps you are building with the outside world to get feedback and to show off your portfolio. To achieve this, you can make your existing apps public or forkable.

Note that all forkable apps are automatically public, but you need to make an app forkable if you want other developers to fork it and start working on their own copy.

When you make an application public (or forkable), it’ll be listed in your public profile. Click on an app to see its details. 

## App Detail Page

The App Detail Page has several sections that provide information about your app. Sections on the App Detail Page can be listed as below:

- **The stats section** shows the average deploy time of the application and the average response time of your APIs on your Serverless Cloud account.
- **The Readme Section** is generated from the `README.md` file in your app directory. You are expected to give information about your app and installation instructions if required in this section.
- **The Fork App button** starts the forking process of the app to your Serverless Cloud account. You’ll be required to sign up for a new account if you don’t already have one. Note that this button is enabled only for forkable apps and disabled for public apps.
- **The App Metadata Section** provides meta information about your app. Visit the [app settings page](https://cloud.serverless.com/orgs/yourOrgName/apps/yourAppName/settings) to edit the information here and add a Github link for your project.
- **Action buttons** let you visit the application running on the Serverless Cloud, check out the GitHub Profile, and share the app on Twitter.

![AppDetailPage](https://user-images.githubusercontent.com/85096820/141509961-4e6ba209-2735-4024-8d82-c1aa1a63760f.png)

## Making an App Public or Forkable

To make an app public or profile, you can visit the app settings page for an app on Serverless Cloud. Select either public or forkable and click the “Save App” button. Check your public profile and you will see your app listed there.

![MakeForkable](https://user-images.githubusercontent.com/85096820/141510119-c0ab1f83-e240-4214-8192-7bf2f9a1034e.png)

Note that you need to deploy to the stage named `production` before making your app public or forkable. Otherwise, it won’t be possible for your app to be visited or successfully forked from your public profile. You can create a permanent stage with the name `production` by  running `cloud deploy production` command on your terminal, or `deploy production` on Cloud Shell. This will deploy the code in your personal instance to the `production` stage.

**Next:** [Forking Apps Into Your Account](cloud/docs/public-apps/forking-apps)
