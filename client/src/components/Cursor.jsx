// components/Cursor

import * as React from "react"
import { usePerfectCursor } from "../hooks/useCursor"

export function Cursor({ point,username }) {
  const rCursor = React.useRef(null)

  const animateCursor = React.useCallback((point) => {
    const elm = rCursor.current
    if (!elm) return
    elm.style.setProperty(
      "transform",
      `translate(${point[0]}px, ${point[1]}px)`
    )
  }, [])

  const onPointMove = usePerfectCursor(animateCursor)

  React.useLayoutEffect(() => onPointMove(point), [onPointMove, point])

  return (
    <>
    <div
      ref={rCursor}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <svg
        style={{
          width: 35,
          height: 35,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35 35"
        fill="none"
        fillRule="evenodd"
      >
        <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
          <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
          <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
        </g>
        <g fill="white">
          <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
          <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
        </g>
        <g fill={"red"}>
          <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
          <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
        </g>
      </svg>
      <span
        style={{
          background: "white",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "bold",
          color: "black",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        {username}
      </span>
    </div>
    </>
  )
}