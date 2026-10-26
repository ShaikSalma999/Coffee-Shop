import { useEffect, useState } from 'react'

// The screens are designed on a 375 x 812 canvas. This hook works out how to fit that
// canvas to the real viewport:
//  - phones (< 500px wide): scale the canvas to the full width and stretch its height
//    to the full viewport height, so the app is edge-to-edge with no side gaps and no scroll.
//    (The fluid Onboarding screen skips scaling entirely and just fills the viewport.)
//  - larger screens: show the framed phone, shrunk if the window is shorter than the frame.
const DESIGN_W = 375
const DESIGN_H = 812
const PHONE_MAX = 500

function measure() {
  const w = window.innerWidth
  const h = window.innerHeight
  if (w < PHONE_MAX) {
    let scale = w / DESIGN_W
    let height = h / scale
    // Short viewport (e.g. browser toolbar showing): the fixed-position screens need at
    // least DESIGN_H of height, so fit to height instead of letting content overlap/clip.
    if (height < DESIGN_H) {
      scale = h / DESIGN_H
      height = DESIGN_H
    }
    return { isPhone: true, vw: w, vh: h, scale, width: DESIGN_W, height, boxW: DESIGN_W * scale, boxH: h }
  }
  const scale = Math.min(1, Math.max(0.5, (h - 32) / DESIGN_H))
  return { isPhone: false, vw: w, vh: h, scale, width: DESIGN_W, height: DESIGN_H, boxW: DESIGN_W * scale, boxH: DESIGN_H * scale }
}

export default function useFitScreen() {
  const [fit, setFit] = useState(measure)
  useEffect(() => {
    const update = () => setFit(measure())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])
  return fit
}
