import React, { useState } from 'react';

import Panel from '../Panel.js';
import MarketNavbar from '../MarketNavbar.js';

import AssetList from '../AssetList.js';
import MarketAsset from '../MarketAsset.js';

import { useBookmarks } from '../../functionality/BookmarkHooks.js';


let Bookmarks = props => {
    const { getBookmarkDDOs } = useBookmarks();

    // Keeps track of fetched asset data 
    let [assetResults, setAssetResults] = useState("");

    function evalBookmarkDDOs() {
        // if it's empty, return
        if(getBookmarkDDOs() == null) return;

        getBookmarkDDOs().then((values) => {
            console.log(values);
            setAssetResults(values);
        });
    }

    function renderBookmarks(){
        // if asset results is empty, fetch it
        if (assetResults == "") {
            evalBookmarkDDOs();
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