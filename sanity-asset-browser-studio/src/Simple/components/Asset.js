import React from 'react'
import { useAssetBrowserActions } from 'part:@sanity/asset-browser/context/dispatch'

const Asset = props => {
  const {
    onDelete,
    onDialogShowConflicts,
    onDialogShowRefs,
    onPick,
    onSelect,
  } = useAssetBrowserActions()

  const {
    item: { asset, errorCode, picked, updating },
  } = props

  const handlePick = () => {
    onPick(asset._id, !picked)
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <input checked={picked} onChange={handlePick} type="checkbox" />
      <img
        src={`${asset.url}?h=${120}&fit=max`}
        style={{
          display: 'block',
          objectFit: 'contain',
          height: '60px',
          width: '60px',
        }}
      />
      <button disabled={updating} onClick={() => onSelect(asset)}>
        Select
      </button>
      <button disabled={updating} onClick={() => onDialogShowRefs(asset)}>
        Show references
      </button>
      <button disabled={updating} onClick={() => onDelete(asset)}>
        Delete
      </button>
      <div>Filename: {asset.originalFilename}</div>
      {updating && <span>Updating</span>}
      {errorCode && (
        <span style={{ color: 'red' }}>Error code: {errorCode}</span>
      )}

      {errorCode && errorCode === 409 && (
        <button
          disabled={updating}
          onClick={() => onDialogShowConflicts(asset)}
        >
          Show conflicts
        </button>
      )}
    </div>
  )
}

export default Asset
