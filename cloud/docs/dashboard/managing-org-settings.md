---
title: Managing Organization Settings
menuText: Managing Organization Settings
description: Learn how you can manage the org-wide settings using Serverless Cloud Dashboard.
menuOrder: 4
parent: Serverless Cloud Dashboard
---

# Managing Organization Settings

When you click on the avatar at the bottom of the left menu, you will see a drop-down menu that gives you access to several pages like “Profile Settings'', “Switch Profile”, “Org Settings” etc. In this section, we will talk about the Org Settings page that allows developers to manage organization level settings such as:


- [Organization Profile](/cloud/docs/dashboard/managing-org-settings#managing-organization-profile) that is visible in the public profiles.
- [Team View](/cloud/docs/dashboard/managing-org-settings#managing-the-team-members) that allows users to add new team members.
- [Access Keys View](/cloud/docs/dashboard/managing-org-settings#managing-access-keys) that allows developers to define keys to be used for CI/CD operations.
- [Params View](/cloud/docs/dashboard/managing-org-settings#managing-parameters) that allows users to create secrets/parameters that are required at the organizational level.


At this section, we'll also give information about : 

- [Deleting Serverless Cloud Account](/cloud/docs/dashboard/managing-org-settings#deleting-account)
- [Switching between Organizations](/cloud/docs/dashboard/managing-org-settings#switching-organizations)


## Managing Organization Profile

The “General” tab on the Org Settings let you change the organization level settings that are used in the [Public Profiles](TODO:Link here).

Note that the organization name is not changeable.

![OrganizationProfile](https://user-images.githubusercontent.com/85096820/141486397-8cfd7790-653b-4ca2-9e8e-63ebd2819bc4.png)

The organization settings as above will make your public profile look as follows:

![PublicProfile](https://user-images.githubusercontent.com/85096820/141486442-7457c072-68cb-4277-af48-e15d313caeef.png)

## Managing Team Members

Serverless Cloud lets you add team members on the Team tab of the Org Settings. During our preview stage, it’s not possible to add team members directly from this screen. Please reach out to us via [cloud@serverless.com](mailto:cloud@serverless.com) if you want to add your colleagues to your Serverless Cloud account.

## Managing Access Keys

Serverless Cloud lets you define access keys that are used by [headless CLI](https://www.serverless.com/cloud/docs/cli#headless-mode) for CI/CD operations. You can create as many access keys as you need.

Please make sure you aren’t sharing your access key with anyone unauthorized as it allows deployments to stages. You can also delete the access keys and create new ones to rotate the access keys. It’s strongly recommended to rotate the access keys.

Note that the only time to see the value of the access keys is when it is created. You’ll need to create a new key if you lose the value.

![AccessKeys](https://user-images.githubusercontent.com/85096820/141486865-ca98b8e5-3035-4bac-a6ce-029f961f91bb.png)

## Managing Parameters

Serverless Cloud allows developers to define organizational level parameters that can be used by all the apps that an organization has. You can edit/add/delete the parameters that you have organization wide on the Parameters tab of the Organization Settings page.

![ParametersDashboard](https://user-images.githubusercontent.com/85096820/141486950-0d3b5fd8-8aa0-4ce1-968b-a800ed41850e.png)

## Deleting Account

Serverless Cloud users who want to delete their account can visit the “Profile” page reachable via the dropdown menu after clicking on the avatar on the left menu. This action is irreversible, so please be cautious with this action. Note that if you own the account, deleting the account will also delete the organization that you own.

![deleteAccount](https://user-images.githubusercontent.com/85096820/141487233-f284a47f-a3d9-4fde-ab34-1d23ddb610ef.png)

## Switching Organizations

Serverless Cloud users can be part of multiple organizations. For example; you can have your personal org for your hobby projects and you can be part of your work organization. Serverless Cloud lets you switch between organizations by clicking on the “Switch Profile” button on the left menu.

Note that this option doesn’t switch the organization on the Serverless Cloud CLI. You’ll need to type `cloud logout` and `cloud login` to switch your organization on the CLI.