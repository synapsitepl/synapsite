"use client"

import { useEffect, useState } from "react"

export function GlowCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)")
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const updateEnabled = () => {
      setIsEnabled(finePointerQuery.matches && !reducedMotionQuery.matches)
    }

    updateEnabled()
    finePointerQuery.addEventListener("change", updateEnabled)
    reducedMotionQuery.addEventListener("change", updateEnabled)

    return () => {
      finePointerQuery.removeEventListener("change", updateEnabled)
      reducedMotionQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    let frameId = 0
    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY })
        setIsVisible(true)
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden transition-opacity duration-300 lg:block"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: position.x,
          top: position.y,
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(217, 70, 239, 0.08) 30%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  )
}
