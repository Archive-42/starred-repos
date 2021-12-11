---
title: Managing Instances
menuText: Managing Instances
description: Learn how you can manage your instances on Serverless Cloud using Serverless Cloud Dashboard
menuOrder: 2
parent: Serverless Cloud Dashboard
---

# Managing Instances of an App

Serverless Cloud lets developers manage different types of instances of an app by editing or deleting the instance, promoting an instance to another instance, overriding inherited parameters, monitoring with logs and metrics, and [assigning custom domains](/cloud/docs/custom-domains) to stages.

Developers can **create an instance** from the dashboard by clicking on the Create App button on the instances list. Note that you can only create a stage from the Serverless Cloud Dashboard. You can’t create a personal instance, a preview instance or a test instance using the dashboard.  

![createInstances](https://user-images.githubusercontent.com/85096820/141469853-5550e9e3-c9b9-45cf-b5fd-c9e225653164.png)

Developers can **edit an instance** by changing the name and the description of it. This could be done using either on the Instance list view from the drop-down menu for an instance or from the Settings tab of the selected instance on Instance detail view.

![editInstances](https://user-images.githubusercontent.com/85096820/141469958-a612f380-057a-4e95-a812-b2ceafe55a4c.png)

Developers can **delete an instance** either on the Instance list view from the drop-down menu for an instance or from the Settings->Danger Zone of the selected instance on Instance detail view. Note that an additional challenge step is required to prevent erroneous deletion of instances.

![deleteInstance](https://user-images.githubusercontent.com/85096820/141470038-9fa35c18-9d46-429e-ab84-4b4cbe9f9047.png)

Developers can **promote an instance** to another instance. Note that both source and target instances should be “stages.” Promoting is used for copying the code from one stage to another in the cases where you want to prevent direct deployments to some stages like production. For example; you can promote the `staging` to `production` stage when you complete the manual and automated tests on your staging instance.

Developers are allowed to **override the parameters** inherited from organization and app levels for an instance from the Parameters tab of the selected instance. For example; you might want to override the development keys for your Stripe account for your production instance.

Developers can **edit the code** attached to their instances by clicking on the “Edit Code” button on the top-right corner of the screen. This will let them clone the code and the data of the instance and start working on the app immediately.

![EditCodeInstances](https://user-images.githubusercontent.com/85096820/141470284-4bd3c4ba-f3ff-47b5-8b1f-8baadafbb7b1.png)


**Next:**[Troubleshooting via Instance Metrics and Logs](/cloud/docs/dashboard/logs-metrics)

