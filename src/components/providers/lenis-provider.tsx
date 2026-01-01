'use client'
import Lenis from '@studio-freight/react-lenis'
import type { ReactNode } from 'react'

function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <Lenis root options={{ lerp: 0.1, duration: 0.7, smoothTouch: true }}>
      {children}
    </Lenis>
  )
}

export default LenisProvider;
