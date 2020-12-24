import React, { useState, useEffect } from 'react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';

import MarketAssetList from '../MarketAssetList';
import '../../styles/Market.css';

import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'
import { useBookmarks } from '../../functionality/BookmarkHooks.js';

let Bookmarks = props => {
    const { getBookmarks, addBookmark, removeBookmark } = useBookmarks();
    
    const { fetchDDO } = useAquariusFetch();

    // Keeps track of fetched asset data 
    let [assetResults, setAssetResults] = useState("");

    let bookmarks = getBookmarks(); //array of dids

    function getBookmarkDDOs() {
    
        // Create an array of promises from the bookmarks to evaluate
        let promiseArray = [];
        bookmarks.forEach((did) => {
            promiseArray.push(fetchDDO(did));
        });

        // Once all promises are done, update assetResults with the data
        Promise.all(promiseArray).then((values) => {
            console.log(values);
            setAssetResults({results: values});
        });
    }

    function renderBookmarks(){
        // if asset results is empty, fetch it
        if (assetResults == "") {
            getBookmarkDDOs();
            console.log("rendering");
        }
        return (
            assetResults != "" ? <MarketAssetList results={assetResults}> </MarketAssetList> : null
        );
    }
    
    return(
        <Panel>
            <div> Bookmarks </div>
            
            {renderBookmarks()}

        </Panel>
    );
}

export default Bookmarks;
export { Bookmarks };