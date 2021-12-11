export const getFilters = currentDocument => {
  const items = [
    {
      title: 'All images',
      value: `_type == "sanity.imageAsset"`,
    },
    {
      title: 'Unused images',
      value: `_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0`,
    },
    {
      title: 'No results (TEST)',
      value: `_type == "foo"`,
    },
  ]

  if (currentDocument && currentDocument._id) {
    items.splice(1, 0, {
      title: 'Images in current entry',
      value: `_type == "sanity.imageAsset" && $documentId in *[references(^._id)]._id`,
    })
  }

  return items
}
export const ORDER_DIRECTIONS = [
  {
    title: 'ASC',
    value: 'asc',
  },
  {
    title: 'DESC',
    value: 'desc',
  },
]
export const SORT_FIELDS = [
  {
    title: 'Filename',
    value: 'originalFilename',
  },
  {
    title: 'Updated time',
    value: '_updatedAt',
  },
]
