import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            background: "linear-gradient(135deg, #c084fc, #a855f7, #22d3ee)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  )
}
