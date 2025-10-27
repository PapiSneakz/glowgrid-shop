'use client'
import { motion } from 'framer-motion'
export default function Hero() {
  return (
    <section className="hero">
      <div className="container mx-auto px-4">
        <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-extralight leading-tight">
          Beautiful wares for modern living
        </motion.h1>
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          A minimal, purposeful storefront inspired by davidlangarica.dev — clean, calm, and strong visual hierarchy.
        </motion.p>
      </div>
    </section>
  )
}
