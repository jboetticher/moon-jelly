import React from 'react'

import { ConfigHelperConfig } from '@oceanprotocol/lib/dist/node/utils/ConfigHelper'
import { useBookmarks } from '../functionality/BookmarkHooks.js';
import { useOcean } from '@oceanprotocol/react'

import BookmarkIcon from '../assets/bookmark.svg';

let BookmarkButton = (props) => {
  const { config } = useOcean()
  const { getBookmarks, addBookmark, removeBookmark } = useBookmarks();
  let bookmarks = getBookmarks();
  const isBookmarked = bookmarks.includes(props.did + "");

  function handleBookmark() {
    console.log("is bookmarked? ", isBookmarked);
    isBookmarked ? removeBookmark(props.did) : addBookmark(props.did)
  }

  return (
    <button
      onClick={handleBookmark}
      //className={`${styles.bookmark} ${isBookmarked ? styles.active : ''} `}
      title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      <svg src={BookmarkIcon}></svg>
    </button>
  )
}

export default BookmarkButton;
