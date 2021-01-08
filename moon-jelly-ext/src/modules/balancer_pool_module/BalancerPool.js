import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { useBookmarks } from '../../functionality/BookmarkHooks.js';
import { useOcean } from '@oceanprotocol/react';
import React, { useState } from 'react';
import ConnectPanel from '../../components/ConnectPanel.js';
import AssetList from '../../components/AssetList.js';
import PoolAsset from './PoolAsset.js';
import './Pool.css';

let BalancerPool = props => {

    const { walletConnected: isWalletConnected } = useWalletReady();
    const { getBookmarkDDOs } = useBookmarks();
    let [ddos, setDDOs] = useState();
    if (ddos == null && isWalletConnected) {
        // sorts out all of the bookmarked pools and then sets them to state
        try {
            getBookmarkDDOs().then(res => {
                let sortedDDOList = [];
                res.map((x, i) => {
                    if (x.price.type == "pool") sortedDDOList.push(x);
                });
                setDDOs(sortedDDOList);
            });
        }
        catch(res) {
            setDDOs([]);
            console.log("there was an error with getting bookmarked ddos", res);
        }
        
        console.log(ddos);
    }

    console.log("yeah it updated", isWalletConnected);

    let panel = isWalletConnected ?
        <>
            <div>Ocean Pools</div>
            <p className="pool-info mb-2">
                All of your bookmarked pools will appear here. Easily view details on each pool.
        </p>
            <AssetList results={ddos} assetEntry={PoolAsset} />
        </>
        :
        <ConnectPanel />;

    return (panel);
}

export default BalancerPool;