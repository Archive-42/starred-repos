---
title: Cloning Instances
menuText: Cloning Instances
description: Copy code and data from other instances to quickly test, debug, and share code.
menuOrder: 4
parent: Worklows
---

# Cloning Instances

Developer Instances are just versatile working copies that can be used for developing, testing, debugging, and more. If you have an existing **git workflow**, you can load the current version of your code from your git repository. However, you can also **clone** an existing instance to give you a starting point. Type `cloud clone @my-org-name/my-app-name/my-stage-name` into the CLI and it will copy both the **code AND data** of `my-app-name` in `my-org-name organization from the `my-stage-name` instance into your Developer Instance and creates a new folder in your local working directory. 

Note that you should have access to `my-org-name`. You can also run clone command without specifying `org-name` and this will clone from your default org. 

```
# An error is occuring at staging but you can't reproduce it on your personal instance.
# Clone staging with both code and data.
> cloud clone staging

# Let's get into the new folder with this directory
> cd app-name


# Start your personal instance replicating the exact environment with staging
> cloud

# After fixing the issue, make your colleagues verify that it's solved on a preview instance
> share

# Push your changes to staging back again or let CI handle it for you
> cloud test
> cloud deploy staging
```
