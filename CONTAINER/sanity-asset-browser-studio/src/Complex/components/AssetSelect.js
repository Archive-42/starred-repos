import produce from 'immer'
import React, { useEffect, useMemo, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useAssetBrowserActions } from 'part:@sanity/asset-browser/context/dispatch'
import { useAssetBrowserState } from 'part:@sanity/asset-browser/context/state'
import Spinner from 'part:@sanity/components/loading/spinner'
import { ORDER_DIRECTIONS, SORT_FIELDS, getFilters } from '../config'
import ViewportObserver from './util/ViewportObserver'
import Box from './styled/Box'
import Grid from './Grid'
import Table from './Table'
import Header from './Header'

const PER_PAGE = 20

const scrollToTop = () => {
  // HACK: Scroll parent dialog container
  const innerContainer = document.querySelector(
    '[class^=FullscreenDialog_inner]'
  )
  if (innerContainer) {
    innerContainer.scrollTo(0, 0)
  }
}

const AssetSelect = props => {
  const { document: currentDocument } = props

  const filters = getFilters(currentDocument)

  const { onFetch } = useAssetBrowserActions()
  const { fetching, items, totalCount } = useAssetBrowserState()
  const [browserOptions, setBrowserOptions] = useState({
    filter: filters[0],
    orderDirection: ORDER_DIRECTIONS[1],
    pageIndex: 0,
    replaceOnFetch: false,
    sortField: SORT_FIELDS[1],
    view: 'grid',
  })
  const [focusedId, setFocusedId] = useState(null)
  const [view, setView] = useState('grid')

  const hasFetchedOnce = typeof totalCount === 'number'

  const fetchPage = (index, replace) => {
    const { filter, orderDirection, sortField } = browserOptions

    const start = index * PER_PAGE
    const end = start + PER_PAGE

    const sort = `order(${sortField.value} ${orderDirection.value})`
    const selector = `[${start}...${end}]`

    // Can be null when operating on pristine / unsaved drafts
    const currentDocumentId = currentDocument && currentDocument._id

    onFetch({
      filter: filter.value,
      ...(currentDocumentId
        ? { params: { documentId: currentDocumentId } }
        : {}),
      projections: `{
        _id,
        _updatedAt,
        extension,
        metadata {
          dimensions,
          isOpaque,
        },
        originalFilename,
        size,
        url
      }`,
      replace,
      selector,
      sort,
    })
  }

  // Fetch items on mount and when options have changed
  useDeepCompareEffect(() => {
    const { pageIndex, replaceOnFetch } = browserOptions

    fetchPage(pageIndex, replaceOnFetch)

    // Scroll to top when replacing items
    if (replaceOnFetch) {
      scrollToTop()
    }
  }, [browserOptions])

  // Scroll to top when view changes
  useEffect(() => {
    // Scroll to top when replacing items
    scrollToTop()
  }, [view])

  // HACK: Temporarily override parent dialog button z-index
  useEffect(() => {
    const closeButton = document.querySelector(
      '[class^=FullscreenDialog_closeButton]'
    )
    if (closeButton) {
      closeButton.style.zIndex = 2
    }
  }, [])

  const hasMore = (browserOptions.pageIndex + 1) * PER_PAGE < totalCount

  const handleAssetFocus = assetId => {
    setFocusedId(assetId)
  }

  const handleFetchNextPage = () => {
    setBrowserOptions(
      produce(draft => {
        draft.pageIndex += 1
        draft.replaceOnFetch = false
      })
    )
  }

  const handleUpdateBrowserOptions = (field, value) => {
    setFocusedId(null)

    setBrowserOptions(
      produce(draft => {
        draft[field] = value
        draft.pageIndex = 0
        draft.replaceOnFetch = true
      })
    )
  }

  const handleUpdateView = view => {
    setView(view)
  }

  return (
    <Box fontSize={1} justifyContent="space-between">
      {/* Header */}
      <Header
        browserOptions={browserOptions}
        filters={filters}
        items={items}
        onUpdateBrowserOptions={handleUpdateBrowserOptions}
        onUpdateView={handleUpdateView}
        view={view}
      />

      {/* Items */}
      <Box mx="auto" mb={4} position="relative" width="100%">
        {/* View: Grid */}
        {view === 'grid' && (
          <Grid
            focusedId={focusedId}
            items={items}
            mt={4}
            onAssetFocus={handleAssetFocus}
          />
        )}

        {/* View: Table */}
        {view === 'table' && <Table items={items} />}

        {/* Viewport observer */}
        {hasFetchedOnce && (
          <ViewportObserver
            onVisible={() => hasMore && handleFetchNextPage()}
          />
        )}
      </Box>

      {/* Spinner */}
      {fetching && (
        <Box bottom="20px" right="32px" pointerEvents="none" position="fixed">
          <Spinner />
        </Box>
      )}
    </Box>
  )
}

export default AssetSelect
