import React, { useEffect, useState } from 'react';
import { useWebStorage } from './WebStorageHooks.js';
import { useOcean } from '@oceanprotocol/react';

function useBookmarks() {
    let { network } = useOcean();
    const { storeToLocal, getFromLocal } = useWebStorage();

    let storedBookmarks = getBookmarks();

    // seperate bookmarks for diff networks
    //let storedBookmarks = getFromLocal("bookmarks_" + network) != null ? getFromLocal("bookmarks_" + network) : storeToLocal("bookmarks_" + network, {});
    //console.log("stored", storedBookmarks);

    //const [bookmarks, setBookmarks] = useState(storedBookmarks != null ? storedBookmarks : []);

    // stores to web data whenever the state changes
    /*useEffect(() => {
        //storeToLocal("bookmarks", JSON.stringify(bookmarks));
    }, bookmarks);*/

    /**
     * Adds a bookmarked did to local storage.
     * @param {the did to add to bookmarks (as a string)} didToAdd 
     */
    function addBookmark(didToAdd) {
        /*const newPinned = {
            ...bookmarks,
            [network]: [didToAdd].concat(bookmarks[network])
        }
        setBookmarks(newPinned);*/
        storedBookmarks.push(didToAdd);
        storeToLocal("bookmarks", JSON.stringify(storedBookmarks));
        //console.log("bookmark added");

        //setBookmarks(bookmarks.push(didToAdd));
    }

    /**
     * Removes a bookmarked did from local storage.
     * @param {the did to remove from bookmarks (as a string)} didToAdd 
     */
    function removeBookmark(didToAdd) {
        /*const newPinned = {
            ...bookmarks,
            [network]: bookmarks[network].filter(
                (did) => did !== didToAdd
            )
        }
        setBookmarks(newPinned);*/
        storedBookmarks.splice(storedBookmarks.indexOf(didToAdd), 1);
        storeToLocal("bookmarks", JSON.stringify(storedBookmarks));
        //removeFromLocal(network + "_" + didToAdd);
        //console.log("bookmark removed");
    }

    function getBookmarks() {
        //console.log("bookmark getted", bookmarks);
        //console.log("bookmark getted 2", typeof bookmarks);
        //return JSON.parse(bookmarks);

        let bookmarks = getFromLocal("bookmarks");
        console.log("hellop", bookmarks);
        return bookmarks != null ? JSON.parse(bookmarks) : [];
    }

    return { addBookmark, removeBookmark, getBookmarks };
}

export { useBookmarks };