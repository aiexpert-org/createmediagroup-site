'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

type Tile = {
  src: string
  alt: string
  /** Column start, 1-indexed, in a 12-col grid. */
  col: number
  /** Row start, 1-indexed. */
  row: number
  colSpan: number
  rowSpan: number
  /** Rotation in degrees, capped at +/- 8. */
  tilt: number
  /** A small offset so tiles overlap. */
  shiftX: number
  shiftY: number
}

const TILES: Tile[] = [
  { src: '/portfolio/sermon-malachi.webp', alt: 'Sermon series art for a Malachi series', col: 1, row: 1, colSpan: 3, rowSpan: 2, tilt: -4, shiftX: -2, shiftY: 4 },
  { src: '/portfolio/announcements-baptism.webp', alt: 'Baptism Sunday announcement graphic', col: 4, row: 1, colSpan: 2, rowSpan: 2, tilt: 3, shiftX: 6, shiftY: -3 },
  { src: '/portfolio/sermon-love-your-neighbor.webp', alt: 'Sermon series art for Love Your Neighbor', col: 6, row: 1, colSpan: 3, rowSpan: 2, tilt: -6, shiftX: 2, shiftY: 2 },
  { src: '/portfolio/announcements-easter-services.webp', alt: 'Easter services announcement', col: 9, row: 1, colSpan: 2, rowSpan: 2, tilt: 5, shiftX: -4, shiftY: 0 },
  { src: '/portfolio/sermon-joy-in-every-season.webp', alt: 'Sermon series art for Joy in Every Season', col: 11, row: 1, colSpan: 2, rowSpan: 2, tilt: -3, shiftX: 0, shiftY: -2 },

  { src: '/portfolio/announcements-21-day-focus.webp', alt: '21 Day Focus announcement', col: 1, row: 3, colSpan: 2, rowSpan: 2, tilt: 6, shiftX: 4, shiftY: -6 },
  { src: '/portfolio/sermon-matters-of-the-heart.webp', alt: 'Sermon series art for Matters of the Heart', col: 3, row: 3, colSpan: 3, rowSpan: 2, tilt: -2, shiftX: -2, shiftY: 6 },
  { src: '/portfolio/announcements-spring-slides.webp', alt: 'Spring announcement slide', col: 6, row: 3, colSpan: 2, rowSpan: 2, tilt: 4, shiftX: 8, shiftY: 0 },
  { src: '/portfolio/sermon-drive-in-church.webp', alt: 'Drive-in church sermon graphic', col: 8, row: 3, colSpan: 3, rowSpan: 2, tilt: -5, shiftX: -6, shiftY: 4 },
  { src: '/portfolio/announcements-welcome-dinner.webp', alt: 'Welcome dinner announcement', col: 11, row: 3, colSpan: 2, rowSpan: 2, tilt: 2, shiftX: 0, shiftY: -4 },

  { src: '/portfolio/sermon-me-i-want-to-be.webp', alt: 'Sermon series art for Me I Want To Be', col: 1, row: 5, colSpan: 2, rowSpan: 2, tilt: -3, shiftX: 2, shiftY: 2 },
  { src: '/portfolio/announcements-men-made-strong.webp', alt: 'Men Made Strong ministry announcement', col: 3, row: 5, colSpan: 2, rowSpan: 2, tilt: 5, shiftX: -4, shiftY: -2 },
  { src: '/portfolio/sermon-foster-care-christmas.webp', alt: 'Sermon series art for Foster Care Christmas', col: 5, row: 5, colSpan: 3, rowSpan: 2, tilt: -4, shiftX: 4, shiftY: 6 },
  { src: '/portfolio/announcements-connection-sunday.webp', alt: 'Connection Sunday announcement', col: 8, row: 5, colSpan: 2, rowSpan: 2, tilt: 3, shiftX: -2, shiftY: -4 },
  { src: '/portfolio/announcements-food-pantry.webp', alt: 'Food Pantry announcement', col: 10, row: 5, colSpan: 3, rowSpan: 2, tilt: -2, shiftX: 0, shiftY: 4 },

  { src: '/portfolio/announcements-clothing-drive.webp', alt: 'Clothing drive announcement', col: 1, row: 7, colSpan: 3, rowSpan: 2, tilt: 4, shiftX: -2, shiftY: -4 },
  { src: '/portfolio/sermon-faq.webp', alt: 'Sermon series FAQ graphic', col: 4, row: 7, colSpan: 2, rowSpan: 2, tilt: -5, shiftX: 6, shiftY: 0 },
  { src: '/portfolio/announcements-august-bbq.webp', alt: 'August BBQ announcement', col: 6, row: 7, colSpan: 3, rowSpan: 2, tilt: 3, shiftX: -2, shiftY: 4 },
  { src: '/portfolio/announcements-follow-the-leader.webp', alt: 'Follow the Leader kids ministry announcement', col: 9, row: 7, colSpan: 2, rowSpan: 2, tilt: -4, shiftX: 4, shiftY: -2 },
  { src: '/portfolio/announcements-virtual-group.webp', alt: 'Virtual small group announcement', col: 11, row: 7, colSpan: 2, rowSpan: 2, tilt: 5, shiftX: -6, shiftY: 0 },
]

export function HeroMosaic() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const [tileRects, setTileRects] = useState<Array<{ cx: number; cy: number } | null>>([])

  const measure = useCallback(() => {
    if (!ref.current) return
    const containerRect = ref.current.getBoundingClientRect()
    const tiles = ref.current.querySelectorAll<HTMLElement>('[data-tile]')
    const rects: Array<{ cx: number; cy: number } | null> = []
    tiles.forEach((el) => {
      const r = el.getBoundingClientRect()
      rects.push({
        cx: r.left - containerRect.left + r.width / 2,
        cy: r.top - containerRect.top + r.height / 2,
      })
    })
    setTileRects(rects)
  }, [])

  useEffect(() => {
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [measure])

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    },
    [shouldReduceMotion],
  )

  const onLeave = useCallback(() => {
    setCursor(null)
  }, [])

  return (
    <>
      {/* Desktop / tablet mosaic */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="hidden md:block relative isolate aspect-[16/11] w-full"
        aria-hidden="true"
      >
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-2 sm:gap-3 [perspective:1200px]">
          {TILES.map((tile, i) => {
            const rect = tileRects[i] ?? null
            let darken = 0
            if (cursor && rect) {
              const dx = cursor.x - rect.cx
              const dy = cursor.y - rect.cy
              const dist = Math.sqrt(dx * dx + dy * dy)
              const radius = 180
              darken = Math.max(0, 1 - dist / radius)
            }
            const grayscale = 1 - darken * 0.95
            const brightness = 1.05 - darken * 0.4
            const opacity = 0.6 + darken * 0.4

            return (
              <div
                key={tile.src}
                data-tile
                className="relative overflow-hidden rounded-xl shadow-sm ring-1 ring-neutral-900/5"
                style={{
                  gridColumn: `${tile.col} / span ${tile.colSpan}`,
                  gridRow: `${tile.row} / span ${tile.rowSpan}`,
                  transform: `translate(${tile.shiftX}px, ${tile.shiftY}px) rotate(${tile.tilt}deg)`,
                  transformOrigin: 'center',
                  transition: shouldReduceMotion
                    ? undefined
                    : 'filter 250ms ease, opacity 250ms ease',
                  filter: `grayscale(${grayscale}) brightness(${brightness})`,
                  opacity,
                }}
              >
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 33vw"
                  className="object-cover"
                  priority={i < 5}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile fallback: grid of a curated subset, lightly desaturated. */}
      <div className="md:hidden grid grid-cols-2 gap-3" aria-hidden="true">
        {TILES.slice(0, 6).map((tile) => (
          <div
            key={tile.src}
            className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-neutral-900/5"
            style={{ filter: 'grayscale(0.4)', opacity: 0.95 }}
          >
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  )
}

type ClusterTile = {
  src: string
  /** Position within the cluster box, in percent. */
  left: number
  top: number
  /** Tile width as a percent of the cluster box. */
  w: number
  tilt: number
  z: number
}

const CLUSTER_TILES: ClusterTile[] = [
  { src: '/portfolio/sermon-malachi.webp', left: 40, top: 0, w: 58, tilt: 5, z: 4 },
  { src: '/portfolio/sermon-love-your-neighbor.webp', left: 4, top: 20, w: 52, tilt: -6, z: 3 },
  { src: '/portfolio/sermon-joy-in-every-season.webp', left: 46, top: 46, w: 50, tilt: 4, z: 2 },
  { src: '/portfolio/sermon-matters-of-the-heart.webp', left: 12, top: 60, w: 42, tilt: -3, z: 1 },
]

/**
 * Compact corner cluster of a few portfolio tiles, tucked in the upper-right.
 * Keeps the cursor-proximity color amplification from the full mosaic so the
 * visible tiles still warm up under the pointer.
 */
export function HeroMosaicCluster() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const [tileRects, setTileRects] = useState<Array<{ cx: number; cy: number } | null>>([])

  const measure = useCallback(() => {
    if (!ref.current) return
    const containerRect = ref.current.getBoundingClientRect()
    const tiles = ref.current.querySelectorAll<HTMLElement>('[data-cluster-tile]')
    const rects: Array<{ cx: number; cy: number } | null> = []
    tiles.forEach((el) => {
      const r = el.getBoundingClientRect()
      rects.push({
        cx: r.left - containerRect.left + r.width / 2,
        cy: r.top - containerRect.top + r.height / 2,
      })
    })
    setTileRects(rects)
  }, [])

  useEffect(() => {
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [measure])

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    },
    [shouldReduceMotion],
  )

  const onLeave = useCallback(() => setCursor(null), [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative aspect-[3/4] w-full"
      aria-hidden="true"
    >
      {CLUSTER_TILES.map((tile, i) => {
        const rect = tileRects[i] ?? null
        let darken = 0
        if (cursor && rect) {
          const dx = cursor.x - rect.cx
          const dy = cursor.y - rect.cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const radius = 160
          darken = Math.max(0, 1 - dist / radius)
        }
        const grayscale = 1 - darken * 0.95
        const brightness = 1.05 - darken * 0.35
        const opacity = 0.7 + darken * 0.3

        return (
          <div
            key={tile.src}
            data-cluster-tile
            className="absolute aspect-square overflow-hidden rounded-xl shadow-sm ring-1 ring-neutral-900/5"
            style={{
              left: `${tile.left}%`,
              top: `${tile.top}%`,
              width: `${tile.w}%`,
              zIndex: tile.z,
              transform: `rotate(${tile.tilt}deg)`,
              transformOrigin: 'center',
              transition: shouldReduceMotion
                ? undefined
                : 'filter 250ms ease, opacity 250ms ease',
              filter: `grayscale(${grayscale}) brightness(${brightness})`,
              opacity,
            }}
          >
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="(min-width: 768px) 20vw, 0px"
              className="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}

/**
 * Full-bleed hero background mosaic, Studio-style. A dense, edge-to-edge grid
 * of portfolio tiles fills the entire hero. Tiles sit desaturated and dimmed
 * by default; hovering an individual tile brings just that one to full color
 * and zooms it slightly. This is the Studio template's per-panel hover pattern
 * (see the portfolio grid in `app/portfolio/page.tsx`): a `group` wrapper with
 * a child image that transitions `grayscale -> grayscale-0` on `group-hover`,
 * `duration-500`. Strict per-tile, no cursor-proximity math, so there is no
 * chain effect or bleed. A right-to-left white gradient keeps the left side
 * (where the headline and CTAs live) clean while the colorful tiles show
 * through on the right.
 */
const BG_TILES: string[] = [
  'sermon-malachi', 'announcements-easter-services', 'sermon-love-your-neighbor', 'social-smp-1', 'sermon-joy-in-every-season', 'announcements-baptism', 'sermon-reset', 'social-summer-sundays', 'youth-timothy', 'sermon-matters-of-the-heart',
  'announcements-21-day-focus', 'sermon-drive-in-church', 'social-strong-men', 'announcements-spring-slides', 'sermon-me-i-want-to-be', 'signage-shot-1', 'social-1-peter', 'announcements-welcome-dinner', 'sermon-faq', 'youth-shot-1',
  'announcements-connection-sunday', 'sermon-foster-care-christmas', 'social-smp-18', 'announcements-food-pantry', 'sermon-this-is-church', 'announcements-men-made-strong', 'social-smp-23', 'signage-guest-reception', 'youth-open-conversations', 'sermon-series-shot-1',
  'announcements-clothing-drive', 'social-smp-9', 'announcements-august-bbq', 'sermon-series-shot-2', 'announcements-follow-the-leader', 'social-smp-35', 'announcements-virtual-group', 'signage-service-announcement', 'youth-shot-3', 'sermon-series-shot-3',
  'social-smp-26', 'announcements-garage', 'sermon-series-shot-4', 'social-asset-1', 'signage-holiday-food', 'youth-shot-5', 'social-smp-40', 'announcements-slide-shot', 'sermon-series-asset', 'social-smp-10',
].map((s) => `/portfolio/${s}.webp`)

export function HeroMosaicBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="grid h-full w-full auto-rows-fr grid-cols-6 gap-1.5 sm:grid-cols-8 lg:grid-cols-10">
        {BG_TILES.map((src, i) => (
          <div
            key={`${src}-${i}`}
            tabIndex={-1}
            className="group relative overflow-hidden rounded-sm transition duration-300 ease-out hover:z-10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 10vw, (min-width: 640px) 12vw, 16vw"
              className="object-cover opacity-55 brightness-95 grayscale-[0.85] transition duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-100 group-hover:brightness-105 group-hover:grayscale-0"
              priority={i < 10}
            />
          </div>
        ))}
      </div>

      {/* Right-to-left white gradient: ~96% white on the left where the copy
          sits, fading to ~8% on the right so the tiles show through.
          `pointer-events-none` so it does not swallow hover on the tiles below
          (without it, this full-bleed overlay intercepts every tile hover). */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 28%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0.08) 100%)',
        }}
      />
      {/* Soft white fade into the page below. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        }}
      />
    </div>
  )
}
