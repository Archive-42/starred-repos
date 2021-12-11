import React from 'react'
import formatRelative from 'date-fns/formatRelative'
import filesize from 'filesize'
import idx from 'idx'
import styled from 'styled-components'
import css from '@styled-system/css'
import { useAssetBrowserActions } from 'part:@sanity/asset-browser/context/dispatch'
import Button from 'part:@sanity/components/buttons/default'
import ErrorIcon from 'part:@sanity/base/error-icon'
import LinkIcon from 'part:@sanity/base/link-icon'
import TrashIcon from 'part:@sanity/base/trash-icon'
import Spinner from 'part:@sanity/components/loading/spinner'
import Checkbox from './styled/Checkbox'
import IconButton from './styled/IconButton'
import Image from './styled/Image'
import Box from './styled/Box'
import Row from './styled/Row'
import ResponsiveBox from './util/ResponsiveBox'

const PREVIEW_HEIGHT = 100

const Container = styled(Row)`
  border-bottom: 1px solid;
  ${css({
    borderColor: 'lighterGray',
  })}

  @media (hover: hover) {
    &:hover {
      ${css({
        bg: 'lighterGray',
      })}
    }
  }
`

const TableRow = props => {
  const {
    onDelete,
    onDialogShowConflicts,
    onDialogShowRefs,
    onPick,
    onSelect,
  } = useAssetBrowserActions()

  const asset = idx(props, _ => _.item.asset)
  const dimensions = idx(props, _ => _.item.asset.metadata.dimensions)
  const errorCode = idx(props, _ => _.item.errorCode)
  const isOpaque = idx(props, _ => _.item.asset.metadata.isOpaque)
  const picked = idx(props, _ => _.item.picked)
  const updating = idx(props, _ => _.item.updating)

  const handleCheckboxChange = () => {
    onPick(asset._id, !picked)
  }

  const handleDeleteAsset = () => {
    onDelete(asset)
  }

  const handleDialogConflicts = e => {
    e.stopPropagation()
    onDialogShowConflicts(asset)
  }

  const handleSelect = () => {
    onSelect(asset)
  }

  const handleShowRefs = () => {
    onDialogShowRefs(asset)
  }

  return (
    <Container fontSize={1} opacity={updating ? 0.5 : 1}>
      {/* Checkbox */}
      <Box>
        <Checkbox
          checked={picked}
          disabled={updating}
          onChange={handleCheckboxChange}
          mx="auto"
        />
      </Box>

      {/* Preview image + spinner */}
      <Box>
        <ResponsiveBox aspectRatio={4 / 3}>
          <Image
            draggable={false}
            opacity={updating ? 0.25 : 1}
            showCheckerboard={!isOpaque}
            src={`${asset.url}?h=${PREVIEW_HEIGHT}&fit=max`}
          />

          {updating && (
            <Box left={0} position="absolute" size="100%" top={0}>
              <Spinner center />
            </Box>
          )}
        </ResponsiveBox>
      </Box>

      {/* Filename */}
      <Box>
        <strong>{asset.originalFilename}</strong>
      </Box>

      {/* Dimensions */}
      <Box>
        {dimensions.width || 'unknown'} x {dimensions.height || 'unknown'} px
      </Box>

      {/* File extension */}
      <Box>{asset.extension.toUpperCase()}</Box>

      {/* Size */}
      <Box>{filesize(asset.size, { round: 0 })}</Box>

      {/* Last updated */}
      <Box>{formatRelative(new Date(asset._updatedAt), new Date())}</Box>

      {/* Error */}
      <Box>
        {errorCode && (
          <IconButton color="red" fontSize={3} onClick={handleDialogConflicts}>
            <ErrorIcon />
          </IconButton>
        )}
      </Box>

      {/* Actions */}
      <Box textAlign={['left', 'right']}>
        {onSelect && (
          <Button
            disabled={updating}
            inverted
            // kind="simple"
            onClick={handleSelect}
          >
            Insert
          </Button>
        )}
        <Button
          disabled={updating}
          icon={LinkIcon}
          kind="simple"
          onClick={handleShowRefs}
        />
        <Button
          color="danger"
          disabled={updating}
          icon={TrashIcon}
          kind="simple"
          onClick={handleDeleteAsset}
        />
      </Box>
    </Container>
  )
}

export default TableRow
