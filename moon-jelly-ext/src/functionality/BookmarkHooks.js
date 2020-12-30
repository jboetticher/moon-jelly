import React, { useEffect, useState } from 'react';
import { useWebStorage } from './WebStorageHooks.js';
import { useAquariusFetch } from './CustomOceanHooks.js'
import { useOcean } from '@oceanprotocol/react';

function useBookmarks() {
    //let { network, balance } = useOcean();
    const network = useOcean()['config']['network'];

    const { storeToLocal, getFromLocal } = useWebStorage();

    const { fetchDDO } = useAquariusFetch();

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

    /**
     * Returns bookmark DDOs as a promise to evaluate for the array of DDOs
     * Returns null if storedBookmarks is empty
     */
    function getBookmarkDDOs() {
        if (storedBookmarks.length == 0) return null;

        // Create an array of promises from the bookmarks to evaluate
        let promiseArray = [];
        storedBookmarks.forEach((did) => {
            promiseArray.push(fetchDDO(did));
        });

        // Return the promise
        return Promise.all(promiseArray);
    }

    return { addBookmark, removeBookmark, getBookmarks, getBookmarkDDOs };
}

export { useBookmarks };