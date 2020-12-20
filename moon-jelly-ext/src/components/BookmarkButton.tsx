import React from 'react'

import { ConfigHelperConfig } from '@oceanprotocol/lib/dist/node/utils/ConfigHelper'
import { useBookmarks } from '../functionality/BookmarkHooks.js';
import { useOcean } from '@oceanprotocol/react'

import BookmarkIcon from '../assets/bookmark.svg'
import styles from './Bookmark.module.css'

let BookmarkButton = (props, { did }: { did: string }) => {
  const { config } = useOcean()
  const { getBookmarks, addBookmark, removeBookmark } = useBookmarks();
  let bookmarks = getBookmarks();
  const isBookmarked =
    bookmarks && bookmarks[(config as ConfigHelperConfig).network]?.includes(did)

  function handleBookmark() {
    isBookmarked ? removeBookmark(did) : addBookmark(did)
  }

  return (
    <button
      onClick={handleBookmark}
      className={`${styles.bookmark} ${isBookmarked ? styles.active : ''} `}
      title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      <BookmarkIcon />
    </button>
  )
}

export default BookmarkButton;
