import { useEffect, useState } from 'react'

const useOnScreen = (ref, options = {}, once) => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const handleIntersecting = ([entry]) => {
      // Update state when observer callback fires
      setIntersecting(entry.isIntersecting)

      // Stop observing
      if (once && entry.isIntersecting) {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersecting, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    // Stop observing on unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return isIntersecting
}

export default useOnScreen
