---
title: Troubleshooting via Metrics and Logs 
menuText: Troubleshooting via Metrics and Logs
description: Learn how you troubleshoot the issues on the applications for Serverless Cloud. 
menuOrder: 3
parent: Serverless Cloud Dashboard
---

# Troubleshooting via Instance Metrics and Logs


Serverless Cloud abstracts away infrastructure and all the concerns related to it. However, applications can experience issues or might not perform as expected for various reasons. Serverless Cloud provides built-in metrics and logs support to help developers resolve issues fast. When you click on an instance, Serverless Cloud shows some high-level metrics such as invocations, error and throttle counts, and average durations.

![OverallMetrics](https://user-images.githubusercontent.com/85096820/141484272-70c78360-96a9-4619-a41b-23bc93bf7bfd.png)

If you notice an issue, you can switch to either the Logs view to dig deeper, or the Metrics view to track the metrics over time with charts.

## Logs View

This view is presented as a tab in the Instance details view to let developers see the logs that the selected instance is producing. Note that logs of an instance are completely isolated from other instances of the same app or the other apps.

Here you can check out the logs to understand the issues. You can select different time intervals and see a filtered view of the logs.

As a side note, Serverless Cloud allows developers to see the logs of their personal instances when Cloud Shell is active but this view is the only way to see logs of preview instances and stages.

![logsView](https://user-images.githubusercontent.com/85096820/141484383-03ce4b54-57c2-41bf-a81c-adb2e53783bc.png)

## Metrics View

This view is presented as a tab in the Instance Details view aiming to help developers track the change in metrics over time. Here you can get a general view of what’s going on with your app on Serverless Cloud.

![MetricsView](https://user-images.githubusercontent.com/85096820/141484459-02ab5192-69d5-4dc7-b0ac-8eb2fdd4cf34.png)

**Next:** [Manage Organization Settings](/cloud/docs/dashboard/managing-org-settings)
