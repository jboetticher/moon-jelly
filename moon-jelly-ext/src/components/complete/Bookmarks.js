import React, { useState } from 'react';

import Panel from '../Panel.js';
import MarketNavbar from '../MarketNavbar.js';

import AssetList from '../AssetList.js';
import MarketAsset from '../MarketAsset.js';

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
            //console.log(values);
            setAssetResults(values);
        });
    }

    function renderBookmarks(){
        // if asset results is empty, fetch it
        if (assetResults == "") {
            getBookmarkDDOs();
            console.log("rendering bookmarks");
        }
        return (
            assetResults != "" ? <AssetList results={assetResults} assetEntry={MarketAsset}> </AssetList> : null
        );
    }
    
    return(
        <Panel>
            <MarketNavbar selected="bookmarks"/>
            <div className="mt-2"> Saved Bookmarks </div>
            
            {renderBookmarks()}

        </Panel>
    );
}

export default Bookmarks;
export { Bookmarks };