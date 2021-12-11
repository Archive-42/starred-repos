---
title: Workflows
menuText: Workflows
description: Learn how to quickly develop Serverless Cloud apps with a single developer or an entire team.
menuOrder: 4
has_children: true
has_toc: false
---

# Workflows in Serverless Cloud

Serverless Cloud lets you deliver applications both when you are building alone and with your colleagues. Run your tests against Cloud, share your work with colleagues, integrate with your favorite CI/CD tool. Below are some example workflows for delivering applications fast.

### Single Developer with a sample project

```
# Initialize a sample project with interactive development mode on Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically

# Deploy your code to "production"
> deploy production
```

![Diagrams for Documentation (3)](https://user-images.githubusercontent.com/85096820/134044297-945190ee-15b1-437f-b9ba-c442a636e007.png)

### Single Developer editing/debugging an existing project

```
# Clone the "dev" stage
> cloud clone dev

#Get into your folder to start with
> cd <appName>

# Enable interactive development mode
> cloud

# Edit your code locally and test the changes in
# your developer instance

# Deploy your code back to "dev"
> deploy dev
```

![Diagrams for Documentation (4)](https://user-images.githubusercontent.com/85096820/134044342-e71946df-d3dc-42ed-8170-d049e6103d73.png)

### Team collaborating on a project

```
# Enable interactive development mode
> cloud

# Edit code locally and test the changes in your
# developer instance

# Share your code and data with your team in a preview instance
> share feature-1

# Continue to work on your developer instance and make changes as feedback comes in.
# Share the changes with your team (to the same preview instance)
> share feature-1 --overwrite

# Once the team is happy with the changes, publish to "dev"
# for additional integration tests and feedbacks
> deploy dev
```

![Diagrams for Documentation (5)](https://user-images.githubusercontent.com/85096820/134044389-3a8b9b50-13bd-4cdc-985b-5bff7196d4a6.png)

### Learn more about the concepts around building applications:

- [Personal Instances](/cloud/docs/workflows/personal-instances)
- [Preview Instances](/cloud/docs/workflows/preview-instances)
- [Stages](/cloud/docs/workflows/stages)
- [Cloning Instances](/cloud/docs/workflows/cloning)
- [Automated Testing](/cloud/docs/workflows/testing)
- [Promoting Stages](/cloud/docs/workflows/promoting-stages)
- [CI/CD](/cloud/docs/workflows/cicd)
