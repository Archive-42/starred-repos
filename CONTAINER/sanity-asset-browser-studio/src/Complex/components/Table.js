import React from 'react'
import css from '@styled-system/css'
import idx from 'idx'
import styled from 'styled-components'
import { layout } from 'styled-system'
import { useAssetBrowserActions } from 'part:@sanity/asset-browser/context/dispatch'
import TableRow from './TableRow'
import Box from './styled/Box'
import Checkbox from './styled/Checkbox'
import Row from './styled/Row'

const Header = styled(Row)`
  position: sticky;
  border-bottom: 1px solid;
  border-spacing: 0;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.025em;

  ${css({
    bg: 'white',
    borderColor: 'lighterGray',
    top: ['headerHeightLarge', 'headerHeightSmall'],
    zIndex: 'header',
  })}

  ${layout};
`

const Table = props => {
  const { items } = props
  const { onPickAll, onPickClear } = useAssetBrowserActions()

  const picked = items && items.filter(item => item.picked)
  const allPicked = picked.length === items.length

  const handleCheckboxChange = e => {
    if (allPicked) {
      onPickClear()
    } else {
      onPickAll()
    }
  }

  return (
    <Box width="100%" {...props}>
      <Header display={['none', 'grid']}>
        <Box textAlign="left">
          {items && items.length > 0 && (
            <Checkbox
              checked={allPicked}
              onChange={handleCheckboxChange}
              mx="auto"
            />
          )}
        </Box>
        <Box textAlign="left"></Box>
        <Box textAlign="left">Filename</Box>
        <Box textAlign="left">Dimensions</Box>
        <Box textAlign="left">Type</Box>
        <Box textAlign="left">Size</Box>
        <Box textAlign="left">Last updated</Box>
        <Box textAlign="left"></Box>
        <Box textAlign="right">Actions</Box>
      </Header>

      {items &&
        items.map(item => {
          const assetId = idx(item, _ => _.asset._id)
          return <TableRow item={item} key={`table-${assetId}`} />
        })}
    </Box>
  )
}

export default Table
