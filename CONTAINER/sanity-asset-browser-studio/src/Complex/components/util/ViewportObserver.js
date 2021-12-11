import React, { useEffect, useRef } from 'react'
import useOnScreen from '../../hooks/useOnScreen'
import Box from '../styled/Box'

const ViewportObserver = props => {
  const {
    onHidden,
    onVisible,
    onVisibleOnce = false,
    ...remainingProps
  } = props

  const ref = useRef(null)
  const inViewport = useOnScreen(
    ref,
    {
      threshold: 0,
    },
    onVisibleOnce
  )

  useEffect(() => {
    if (inViewport) {
      if (onVisible) {
        onVisible()
      }
    } else {
      if (onHidden) {
        onHidden()
      }
    }
  }, [inViewport])

  return <Box ref={ref} zIndex="-1" {...remainingProps} />
}

export default ViewportObserver
