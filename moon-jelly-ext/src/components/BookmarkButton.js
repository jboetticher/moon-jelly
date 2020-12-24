import React, {useState} from 'react'

import { ConfigHelperConfig } from '@oceanprotocol/lib/dist/node/utils/ConfigHelper'
import { useBookmarks } from '../functionality/BookmarkHooks.js';
import { useOcean } from '@oceanprotocol/react'

import BookmarkIcon from '../assets/bookmark.svg';

let BookmarkButton = (props) => {
  const { getBookmarks, addBookmark, removeBookmark } = useBookmarks();

  let bookmarks = getBookmarks();
  //console.log("the bookmarks", bookmarks);

  let [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(props.did));

  function handleBookmark() {
    if(isBookmarked){
      setIsBookmarked(false);
      removeBookmark(props.did);
    }
    else {
      setIsBookmarked(true);
      addBookmark(props.did);
    }
  }

  return (
    /*{<button
      onClick={handleBookmark}
      //className={`${styles.bookmark} ${isBookmarked ? styles.active : ''} `}
      title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    </button>}*/
    <div>
      <a 
        onClick={handleBookmark}
        style={{ cursor: "pointer" }}
      >
        {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </a>
    </div>
  )
}

export default BookmarkButton;
