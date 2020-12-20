import React, { useEffect, useState } from 'react';
import { useWebStorage } from './WebStorageHooks.js';
import { useOcean } from '@oceanprotocol/react';

function useBookmarks() {
    let { network } = useOcean();
    const { storeToLocal, getFromLocal } = useWebStorage();
    let storedBookmarks = getFromLocal("bookmarks");
    const [bookmarks, setBookmarks] = useState(storedBookmarks != null ? storedBookmarks : {});

    // stores to web data whenever the state changes
    useEffect(() => {
        storeToLocal("bookmarks", bookmarks);
    }, bookmarks);

    /**
     * Adds a bookmarked did to local storage.
     * @param {the did to add to bookmarks (as a string)} didToAdd 
     */
    function addBookmark(didToAdd) {
        const newPinned = {
            ...bookmarks,
            [network]: [didToAdd].concat(bookmarks[network])
        }
        setBookmarks(newPinned)
    }

    /**
     * Removes a bookmarked did from local storage.
     * @param {the did to remove from bookmarks (as a string)} didToAdd 
     */
    function removeBookmark(didToAdd) {
        const newPinned = {
            ...bookmarks,
            [network]: bookmarks[network].filter(
                (did) => did !== didToAdd
            )
        }
        setBookmarks(newPinned)
    }

    function getBookmarks() {
        return bookmarks;
    }

    return { addBookmark, removeBookmark, getBookmarks };
}

export { useBookmarks };