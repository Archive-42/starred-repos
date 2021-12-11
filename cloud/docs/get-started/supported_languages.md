---
title: Supported Languages
menuText: Supported Languages
description: Learn about Serverless Cloud's concepts with interfaces Dashboard.
menuOrder: 1
parent: Quick Start
---

# Supported Langauges

Serverless Cloud allows developers to develop their applications both in Javascript and in Typescript.

## Javascript

You can import the `api`, `data`, `schedule`, and `params` interfaces that you can use while developing on Serverless Cloud. You can import those interfaces by importing them from @serverless/cloud package at the top of your index.js file as follows.

```javascript
// ES Modules
import { api, data, schedule, params } from "@serverless/cloud";

// CommonJS
const { api, data, schedule, params } = require("@serverless/cloud");
```

If you'd like to use `require` statements, you need change the extension of your file as .cjs and update your `package.json` file accordingly. However, we encourage our users to use ES modules way if possible.

## Typescript

In order to enable Typescript, you need to change entry point of your application to `index.ts`.

Add `tsconfig.json` to the root of your project, with this minimum configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

```typescript
// index.ts

import { api } from "@serverless/cloud";

api.get("/message", async (req: any, res: any) => {
  res.send({ message: "Hello Cloud!" });
});
```

You can write your tests in Typescript as well. To reference Jest globals in your tests, install the Jest types library:

```bash
npm i --save-dev @types/jest
```
