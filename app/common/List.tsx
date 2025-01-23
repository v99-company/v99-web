'use client'
import { useState, useEffect } from 'react'
import { ListItem } from './ListItem'
import { motion, AnimatePresence } from 'framer-motion'
import { Client } from '../utils/interfaces'

interface ListProps {
  items: Client []
}

export function List({ items }: ListProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {mounted && items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem {...item} />

          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

