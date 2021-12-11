import React, { useEffect, useState } from 'react'
import { useAssetBrowserActions } from 'part:@sanity/asset-browser/context/dispatch'
import { useAssetBrowserState } from 'part:@sanity/asset-browser/context/state'
import Asset from './Asset'

const FILTER = `_type == "sanity.imageAsset" && mimeType == "image/jpeg"`
const PAGE_SIZE = 20

const AssetSelect = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const {
    onDeletePicked,
    onFetch,
    onPickAll,
    onPickClear,
  } = useAssetBrowserActions()
  const { fetching, items, totalCount } = useAssetBrowserState()

  // Fetch on mount and when pageIndex changes
  useEffect(() => {
    const start = pageIndex * PAGE_SIZE
    const end = start + PAGE_SIZE

    onFetch({
      filter: FILTER,
      replace: true,
      selector: `[${start}...${end}]`,
    })
  }, [pageIndex])

  const handleNextPage = () => {
    setPageIndex(prevIndex => prevIndex + 1)
  }

  const handlePreviousPage = () => {
    setPageIndex(prevIndex => prevIndex - 1)
  }

  const picked = items && items.filter(item => item.picked)
  const totalPages = Math.ceil((totalCount || 0) / PAGE_SIZE)

  return (
    <div>
      <header>
        <div>Page size: {PAGE_SIZE}</div>
        <div>Fetching: {fetching.toString()}</div>

        {totalCount >= 0 && <div>Total Items: {totalCount}</div>}

        {totalPages > 0 && (
          <div>
            Page: {pageIndex + 1} / {totalPages}
          </div>
        )}

        <div>
          Filter: <code>{FILTER}</code>
        </div>
        <div>Picked total: {picked.length}</div>
        <div>
          <button disabled={picked.length === 0} onClick={() => onPickClear()}>
            deselect all
          </button>
          <button
            disabled={picked.length === items.length}
            onClick={() => onPickAll()}
          >
            select all
          </button>
          <button
            disabled={picked.length === 0}
            onClick={() => onDeletePicked()}
          >
            delete selected
          </button>
        </div>

        <div>
          <button disabled={pageIndex === 0} onClick={handlePreviousPage}>
            previous page
          </button>
          <button
            disabled={pageIndex + 1 === totalPages || totalPages === 0}
            onClick={handleNextPage}
          >
            next page
          </button>
        </div>
      </header>
      <div>
        {items && items.map(item => <Asset item={item} key={item.asset._id} />)}
      </div>
    </div>
  )
}

export default AssetSelect
