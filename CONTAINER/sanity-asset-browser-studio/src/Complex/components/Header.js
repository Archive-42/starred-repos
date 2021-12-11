import React from 'react'
import pluralize from 'pluralize'
import { useAssetBrowserActions } from 'part:@sanity/asset-browser/context/dispatch'
import { useAssetBrowserState } from 'part:@sanity/asset-browser/context/state'
import FileInputButton from 'part:@sanity/components/fileinput/button'
import UploadIcon from 'part:@sanity/base/upload-icon'
import DropDownButton from 'part:@sanity/components/buttons/dropdown'
import Button from 'part:@sanity/components/buttons/default'
import { ORDER_DIRECTIONS, SORT_FIELDS } from '../config'
import Box from './styled/Box'

const Header = props => {
  const {
    browserOptions,
    filters,
    onUpdateBrowserOptions,
    onUpdateView,
    view,
  } = props
  const { onDeletePicked, onPickAll, onPickClear } = useAssetBrowserActions()
  const { items, totalCount } = useAssetBrowserState()

  const picked = items && items.filter(item => item.picked)
  const hasPicked = picked.length > 0
  const allPicked = picked.length === items.length

  return (
    <Box
      bg="white"
      height={['headerHeightLarge', 'headerHeightSmall']}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      position="sticky"
      top={0}
      zIndex="header"
    >
      {/* File upload */}
      <Box alignItems="center" display="flex" p={2}>
        <Box fontSize={2}>
          <FileInputButton
            color="primary"
            disabled={true}
            icon={UploadIcon}
            inverted
            onSelect={() => {}}
            style={{
              padding: '0 1.5em',
            }}
          >
            Upload
          </FileInputButton>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection={['column', 'row']}
        justifyContent="space-between"
        p={2}
      >
        {/* View toggles */}
        <Box flex="3" mb={[2, 0]}>
          <Button
            inverted={view !== 'grid'}
            onClick={() => onUpdateView('grid')}
          >
            Grid
          </Button>

          <Button
            inverted={view !== 'table'}
            onClick={() => onUpdateView('table')}
          >
            Table
          </Button>
        </Box>

        {/* Main filters */}
        <Box mb={[2, 0]}>
          <DropDownButton
            inverted
            items={filters}
            onAction={filter => onUpdateBrowserOptions('filter', filter)}
          >
            {browserOptions.filter.title}
          </DropDownButton>

          <Button disabled={true} inverted={true}>
            Search by entry
          </Button>
        </Box>

        {/* Sort / order dropdowns */}
        <Box flex="3" textAlign={['left', 'right']}>
          <DropDownButton
            inverted
            items={SORT_FIELDS}
            onAction={sortField =>
              onUpdateBrowserOptions('sortField', sortField)
            }
          >
            {browserOptions.sortField.title}
          </DropDownButton>
          <DropDownButton
            inverted
            items={ORDER_DIRECTIONS}
            onAction={orderDirection =>
              onUpdateBrowserOptions('orderDirection', orderDirection)
            }
          >
            {browserOptions.orderDirection.title}
          </DropDownButton>
        </Box>
      </Box>

      <Box
        alignItems={['flex-start', 'center']}
        borderBottom="1px solid"
        borderTop="1px solid"
        borderColor="lightGray"
        display="flex"
        flexDirection={['column-reverse', 'row']}
        justifyContent={['center', 'space-between']}
        p={2}
        width="100%"
      >
        {/* Total image count / picked count */}
        <Box pt={[2, 0]}>
          {totalCount === undefined ? (
            'Loading..'
          ) : (
            <span>
              {totalCount > 0
                ? `${totalCount} ${pluralize('image', totalCount)}`
                : 'No images found'}
            </span>
          )}

          {hasPicked && (
            <Box color="gray" display="inline" ml={2}>
              {picked.length} selected
            </Box>
          )}
        </Box>

        {/* Pick actions */}
        <Box>
          <Button disabled={allPicked} inverted onClick={onPickAll}>
            Select all
          </Button>
          <Button disabled={!hasPicked} inverted onClick={onPickClear}>
            Deselect all
          </Button>
          <Button
            color="danger"
            disabled={!hasPicked}
            inverted
            onClick={onDeletePicked}
          >
            Delete selected
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
