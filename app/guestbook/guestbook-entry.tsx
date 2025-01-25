'use client'

import { motion } from 'framer-motion'
import { SkeletonBase } from '../components/skeleton-base'

export default function GuestbookEntries() {
  const entries = [
    {
      id: 1,
      body: 'This is a Demo.',
      created_by: 'Sean',
      created_at: '2025-01-25 22:04:07',
      updated_at: '2025-01-25 22:04:07',
      is_reply: 1,
      reply_to: 0,
      slug: 'guestbook',
      is_banner: 2,
      banner_url: '',
    },
  ]

  if (!entries || entries.length === 0) {
    return (
      <>
        <div className="flex flex-col">
          <SkeletonBase className="h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-32" />
          <SkeletonBase className="mt-5 h-5 w-32" />
          <SkeletonBase className="mt-5 h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-32" />
        </div>
      </>
    )
  }

  const guestbooks = entries.filter((entry) => entry.is_reply === 1)
  const replies = entries.filter((entry) => entry.is_reply === 2)

  return guestbooks?.map((entry, index) => {
    const reply = replies.find((reply) => reply.reply_to === entry.id)

    if (entry.is_banner === 1) {
      return (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-4 flex w-full flex-col items-center"
        >
          <a
            target="_blank"
            href={entry.banner_url}
            className="rounded-lg bg-blue-700 px-2 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-700/20 transition-shadow duration-300 hover:shadow-none dark:shadow-none"
          >
            {entry.body}
          </a>
        </motion.div>
      )
    }

    return (
      <motion.div
        key={entry.id}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-4 flex flex-col"
      >
        <div className="w-full break-words text-sm">
          <span className="mr-1 text-neutral-600 dark:text-neutral-400">
            {entry.created_by}:
          </span>
          {entry.body}
        </div>
        {reply && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 + 0.1 }}
            className="flex justify-end"
          >
            <div className="mt-3 max-w-[90%] rounded-lg bg-neutral-100 p-2 text-left text-xs text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
              {reply.body}
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  })
}
