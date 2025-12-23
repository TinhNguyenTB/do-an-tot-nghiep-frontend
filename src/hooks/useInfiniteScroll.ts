import { useEffect, useRef } from 'react'

export function useInfiniteScroll(onLoadMore: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore()
        }
      },
      { threshold: 1 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [enabled, onLoadMore])

  return ref
}
