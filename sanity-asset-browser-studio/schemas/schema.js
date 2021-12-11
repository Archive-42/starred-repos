// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Complex from '../src/Complex/components/AssetSelectWrapper'
import Simple from '../src/Simple/components/AssetSelect'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
      name: 'article',
      title: 'Article',
      type: 'document',
      fields: [
        {
          title: 'Title',
          name: 'name',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          title: 'Image (Simple)',
          name: 'imageExampleTwo',
          type: 'image',
          description: 'Bare bones paginated example, only displaying JPEGs',
          assetSelectComponent: Simple,
        },
        {
          title: 'Image (Complex)',
          name: 'imageExampleOne',
          type: 'image',
          description:
            'A more fleshed out example with basic sort / filtering and multiple views',
          assetSelectComponent: Complex,
        },
        {
          title: 'Image (Default)',
          name: 'imageExampleThree',
          type: 'image',
          description: 'The current select asset that comes with Sanity',
        },
      ],
    },
  ]),
})
