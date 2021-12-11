## Example studio demonstrating custom asset select components

This studio utilises the draft `asset-browser` package and consists of a single document type highlighting:

1. The default Sanity asset selector (with basic snackbars displayed on asset deletion)
2. An un-styled, barebones example showing basic pagination, and support for deleting multiple assets
3. A 'bells-and-whistles' example showing the above, with support for multiple views, custom sorting and basic filtering options

### Setup

```
// Clone and init fork
git clone -b asset-browser --single-branch git@github.com:robinpyon/sanity.git

// Bootstrap monorepo and build
cd sanity
yarn && yarn run init

// Init yarn links¹
yarn link --cwd ./packages/@sanity/asset-browser && yarn link --cwd ./packages/@sanity/components && yarn link --cwd ./packages/@sanity/form-builder

// Clone the example studio
cd ..
git clone git@github.com:robinpyon/sanity-asset-browser-studio.git

// Install dependencies and link packages
cd sanity-asset-browser-studio
yarn && yarn link @sanity/asset-browser && yarn link @sanity/components && yarn link @sanity/form-builder

// (Update settings in sanity.json to point to your own project)

// Run the studio
yarn start
```

¹ If there's a better way to link the entire sanity monorepo when working locally, I'd love to know!
