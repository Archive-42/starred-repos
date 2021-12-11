import React from 'react'
import idx from 'idx'
import filesize from 'filesize'
import { useAssetBrowserActions } from 'part:@sanity/asset-browser/context/dispatch'
import Button from 'part:@sanity/components/buttons/default'
import ErrorIcon from 'part:@sanity/base/error-icon'
import LinkIcon from 'part:@sanity/base/link-icon'
import Spinner from 'part:@sanity/components/loading/spinner'
import Box from './styled/Box'
import IconButton from './styled/IconButton'
import ResponsiveBox from './util/ResponsiveBox'
import Checkbox from './styled/Checkbox'
import Image from './styled/Image'

const Card = props => {
  const { focused, onAssetFocus } = props

  const asset = idx(props, _ => _.item.asset)
  const dimensions = idx(props, _ => _.item.asset.metadata.dimensions) || 100
  const errorCode = idx(props, _ => _.item.errorCode)
  const isOpaque = idx(props, _ => _.item.asset.metadata.isOpaque)
  const picked = idx(props, _ => _.item.picked)
  const updating = idx(props, _ => _.item.updating)

  const {
    onDialogShowConflicts,
    onDialogShowRefs,
    onPick,
    onSelect,
  } = useAssetBrowserActions()

  const handleAssetFocus = () => {
    onAssetFocus(asset._id)
  }

  const handleCheckboxChange = e => {
    e.stopPropagation()
    onPick(asset._id, !picked)
  }

  const handleDialogConflicts = e => {
    e.stopPropagation()
    onDialogShowConflicts(asset)
  }

  const handleDialogShowRefs = e => {
    e.stopPropagation()
    onDialogShowRefs(asset)
  }

  const handleSelect = () => {
    onSelect(asset)
  }

  const dpi =
    typeof window === 'undefined' || !window.devicePixelRatio
      ? 1
      : Math.round(window.devicePixelRatio)
  const imgH = 100 * Math.max(1, dpi)

  let borderColor = focused ? 'darkGray' : errorCode ? 'red' : 'lighterGray'

  return (
    <Box
      bg="lighterGray"
      border="1px solid"
      borderColor={borderColor}
      display="block"
      onClick={handleAssetFocus}
      position="relative"
    >
      {/* Image */}
      <ResponsiveBox aspectRatio={4 / 3}>
        <Image
          draggable={false}
          opacity={updating ? 0.25 : 1}
          showCheckerboard={!isOpaque}
          src={`${asset.url}?h=${imgH}&fit=max`}
        />

        {/* Spinner */}
        {updating && (
          <Box left={0} position="absolute" size="100%" top={0}>
            <Spinner center />
          </Box>
        )}

        {/* Insert image button */}
        {focused && onSelect && (
          <Box
            alignItems="center"
            bg="blackOverlay"
            display="flex"
            justifyContent="center"
            left={0}
            position="absolute"
            size="100%"
            top={0}
          >
            <Button color="white" onClick={handleSelect}>
              Insert image
            </Button>
          </Box>
        )}

        {/* Reference button */}
        <IconButton
          fontSize={2}
          onClick={handleDialogShowRefs}
          opacity={0.8}
          position="absolute"
          right={2}
          top={2}
        >
          <LinkIcon />
        </IconButton>

        {/* Pick checkbox */}
        <Box position="absolute" left={2} top={2}>
          <Checkbox
            checked={picked}
            disabled={updating}
            onChange={handleCheckboxChange}
            onClick={e => e.stopPropagation()}
          />
        </Box>

        {/* Error button */}
        {errorCode && (
          <IconButton
            bottom={2}
            color="red"
            fontSize={3}
            onClick={handleDialogConflicts}
            position="absolute"
            right={2}
          >
            <ErrorIcon />
          </IconButton>
        )}
      </ResponsiveBox>

      {/* Image details */}
      <Box
        bg="white"
        boxSizing="border-box"
        fontSize={1}
        position="relative"
        width="100%"
      >
        {/* Filename */}
        <Box overflow="hidden" pb={4} px={2} pt={1} textOverflow="ellipsis">
          <strong>{asset.originalFilename}</strong>
        </Box>

        {/* Extension / filesize / dimensions */}
        <Box
          alignItems="center"
          color="gray"
          display="flex"
          fontSize={0}
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <Box flex="3">{asset.extension.toUpperCase()}</Box>
          <Box textAlign="center">{filesize(asset.size, { round: 0 })}</Box>
          <Box flex="3" textAlign="right">
            {dimensions.width} x {dimensions.height}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(Card)
