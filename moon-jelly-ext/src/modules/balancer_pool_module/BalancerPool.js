import React, { useState } from 'react';
import { OceanPool } from '@oceanprotocol/lib/dist/node/balancer/OceanPool';
import { useOcean } from '@oceanprotocol/react';
import { useBookmarks } from '../../functionality/BookmarkHooks.js';
import AssetList from '../../components/AssetList.js';
import PoolAsset from './PoolAsset.js';

let BalancerPool = props => {

    const { getBookmarkDDOs } = useBookmarks();
    let [ddos, setDDOs] = useState();
    if (ddos == null) {
        // sorts out all of the bookmarked pools and then sets them to state
        getBookmarkDDOs().then(res => {
            let sortedDDOList = [];
            res.map((x, i) => {
                if(x.price.type == "pool") sortedDDOList.push(x);
            });
            setDDOs(sortedDDOList);
        });
    } 
    console.log(ddos);

    let ocean = useOcean();
    console.log(ocean);
    //let pool = new OceanPool(ocean.web3, null, null, null, null, '0xB602b33f5b207984B2ac9cCb378ddEe78B4D29da');
    //console.log(pool);

    return (
        <>
            <div>uwu balancer pools uwu</div>
            <AssetList results={ddos} assetEntry={PoolAsset} />
        </>
    );
}

export default BalancerPool;