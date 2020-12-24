import React, { useEffect, useState } from 'react';
import { useWebStorage } from './WebStorageHooks.js';
import { useOcean } from '@oceanprotocol/react';

function useBookmarks() {
    //let { network, balance } = useOcean();
    const network = useOcean()['config']['network'];

    const { storeToLocal, getFromLocal } = useWebStorage();

    // Stringify'd array that is stored in localStorage
    let bookmarksName = "bookmarks_" + (network); 
    let storedBookmarks = getFromLocal(bookmarksName) != null ? JSON.parse(getFromLocal(bookmarksName)) : [];

    /**
     * Adds a bookmarked did to local storage.
     * @param {the did to add to bookmarks (as a string)} didToAdd 
     */
    function addBookmark(didToAdd) {
        storedBookmarks.push(didToAdd);
        storeToLocal(bookmarksName, JSON.stringify(storedBookmarks));
    }

    /**
     * Removes a bookmarked did from local storage.
     * @param {the did to remove from bookmarks (as a string)} didToAdd 
     */
    function removeBookmark(didToAdd) {
        storedBookmarks.splice(storedBookmarks.indexOf(didToAdd), 1);
        storeToLocal(bookmarksName, JSON.stringify(storedBookmarks));
    }

    /**
     * Returns bookmarks as an array of DIDs
     */
    function getBookmarks() {
        return storedBookmarks;
    }

    return { addBookmark, removeBookmark, getBookmarks };
}

export { useBookmarks };