'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

// A single widescreen piece of Emily's work with a subtle scroll parallax. The
// outer element fades + scales in on enter (whileInView); the inner card drifts
// a few px on the Y axis as the section moves through the viewport. The whole
// card (image + shadow) translates together so there is no clip gap.
export function WorkShowcase({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['32px', '-32px'],
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -120px' }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <motion.div
        style={{ y }}
        className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-neutral-900/5"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
