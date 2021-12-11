---
title: Managing Apps
menuText: Managing Apps
description: Learn how you can manage your apps on Serverless Cloud using Serverless Cloud Dashboard
menuOrder: 1
parent: Serverless Cloud Dashboard
---

# Managing Apps on Serverless Cloud Dashboard

Serverless Cloud lets developers add new apps or edit existing ones, delete when there’s no instance attached, and fork apps to copy existing apps without impacting your colleagues. 

Developers can always **create a new app** on Serverless Cloud Dashboard with a couple of clicks. Click on the “Create App” button to initialize the app creation wizard. Here you can either create an empty app with no instances and start working from scratch or fork an existing app from our repository. 

![craetingApp](https://user-images.githubusercontent.com/85096820/141463648-20c174fa-e642-4294-98cd-4e06c7d1bd0c.png)

**Editing apps** allows developers to change the name and description, add the GitHub repo url, and make the app public or forkable. There are two ways to edit an app, editing from the “Apps List View” and editing from “App Detail View”. When you click on the “Edit App” button in the dropdown menu in the App list view. A dialog will open to let you edit the app. 

![EditApp](https://user-images.githubusercontent.com/85096820/141467896-40ba84c6-bd60-4bfc-9c94-1c685114041c.png)

Meta information editable here would be visible to the public when you [make it public or forkable] (TODO:link to forkable app documentation). 

![editDialog](https://user-images.githubusercontent.com/85096820/141468320-27606406-c5c7-494e-9377-3afa7303be05.png)

Developers can **delete an app** when they no longer need it. You can do this either using the dropdown menu in the App list view or in the App details view in Danger Zone. 

![deleteApp](https://user-images.githubusercontent.com/85096820/141468163-b73063be-08db-49f8-97f5-37d0c9eab713.png)

Note that an app with instances can’t be deleted on Serverless Cloud. You need to delete all instances of an app first. 

Developers might want to work on existing apps without impacting the original application. In such cases, developers can **fork an app**. This allows developers to work on it independently and build new features on top of existing apps. This can be achieved by using the dropdown menu on the App list view. 

![ForkApp](https://user-images.githubusercontent.com/85096820/141468411-b35c49e9-11ba-4094-af9a-b96c5ebb7bed.png)

Clicking on “Fork App” starts the wizard to fork an app. You’ll be asked to enter the name for the new app. 

![ForkDialog](https://user-images.githubusercontent.com/85096820/141468473-4febc4a1-c60d-4225-9a4e-4d33ff49270c.png)

Developers can **edit the code of an app** by clicking the “Edit Code” button on the top-right corner of the screen. This will let them clone the code and the data of the instance and start working on the application immediately. The CLI will ask the user to specify from which instance they want to clone the code and the data. 

![EditCode](https://user-images.githubusercontent.com/85096820/141468564-1f7baaf3-3538-42c9-b35f-b395632d6a5a.png)

In order to list the instances of an app, you can click on the app in the App list view and you’ll be directed to the Instances list view.  

You can also create parameters for your app or override the organization-wide parameters of your application in this view. To see how to achieve this, you can visit [here](https://www.serverless.com/cloud/docs/apps/params). 

**Next:** [Managing Instances](/cloud/docs/dashboard/managing-instances)
