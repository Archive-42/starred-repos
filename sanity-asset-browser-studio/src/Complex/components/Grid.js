import React from 'react'
import idx from 'idx'
import Box from './styled/Box'
import Card from './Card'

const Grid = props => {
  const { focusedId, items, onAssetFocus, ...rest } = props

  return (
    <Box
      display="grid"
      gridGap="30px"
      gridTemplateColumns="repeat(auto-fill, 250px)"
      justifyContent="center"
      rowGap="30px"
      {...rest}
    >
      {items &&
        items.map(item => {
          const assetId = idx(item, _ => _.asset._id)
          return (
            <Card
              item={item}
              focused={focusedId && focusedId === assetId}
              key={`grid-${assetId}`}
              onAssetFocus={onAssetFocus}
            />
          )
        })}
    </Box>
  )
}

export default Grid
