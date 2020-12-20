import React from 'react'

import { ConfigHelperConfig } from '@oceanprotocol/lib/dist/node/utils/ConfigHelper'
import { useBookmarks } from '../functionality/BookmarkHooks.js';
import { useOcean } from '@oceanprotocol/react'

import Bookmark from '../assets/Bookmark.svg';

let BookmarkButton = (props) => {
  const { config } = useOcean()
  const { getBookmarks, addBookmark, removeBookmark } = useBookmarks();
  let bookmarks = getBookmarks();
  const isBookmarked =
    bookmarks && bookmarks[config.network]?.includes(did)

  function handleBookmark() {
    isBookmarked ? removeBookmark(did) : addBookmark(did)
  }

  return (
    <button
      onClick={handleBookmark}
      //className={`${styles.bookmark} ${isBookmarked ? styles.active : ''} `}
      title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      <BookmarkIcon />
    </button>
  )
}

export default BookmarkButton;
