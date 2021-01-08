import React, { useState, useEffect } from 'react';
import BookmarkButton from '../../components/BookmarkButton.js';
import OneInchAlertForm from './OneInchAlertForm.js';
import { useOcean } from '@oceanprotocol/react';
import { useWebStorage } from '../../functionality/WebStorageHooks.js';

import './OneInchAsset.css';

let OneInchAsset = props => {

    const network = useOcean()['config']['network'];

    const { getArrayFromLocal } = useWebStorage();

    // Keeps track of the number of alerts attached to asset
    // Updated by OneInchAlertForm child component
    let [numAlerts, setNumAlerts] = useState(getEntriesArrayFromStorage().length);

    // Probably a better way to do this, but for now, it is a little hacky
    //#region Unfortunate copy-paste here from OneInchAlertForm to get the initial number of alerts

    // Gets the associated entries array from storage
    // Returns empty array if it is not in storage
    // Returns the array if in storage
    function getEntriesArrayFromStorage() {
        // Get the array from local storage
        let storedList = getArrayFromLocal("oneInchAlertList_" + network);

        // Find the associated entry in the array
        let storedEntry = storedList.find(item => {
            return item.did == props.did;
        });

        if (storedEntry == null) {
            return [];
        }
        else {
            // Have to parse before returning to make it an array object
            return storedEntry.entries;
        }
    }
    //#endregion

    function createLabelExtra() {

        let exactOceanPrice = props.results[props.key]['price']['value'];
        let convPrice = (exactOceanPrice / props.convRate).toPrecision(6);

        return (
            <div className="assetLabelPricing">
                <div className="tokenSymbol"> {props.datatokenSymbol} </div>
                <div className="assetPrice tokenSymbol">
                    {props.datatokenPrice != 0 ?
                        <div>
                            <span className="priceNumber">{props.datatokenPrice}</span>
                            <span>OCEAN</span>
                            {props.pool.length > 0 ? <span className="poolSymbol">POOL</span> : null}
                        </div>
                        :
                        <div>
                            No price data found
                        </div>
                    }
                    <div>
                        <span className="priceNumber">{parseFloat(convPrice).toFixed(5)}</span>
                        <span>{props.token}</span>
                    </div>
                    <div>
                        {numAlerts} triggers set
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            label={props.assetName}
            labelExtra={createLabelExtra()}
            className="assetBody"
            key={props.key}
        >
            <div><a href={"https://market.oceanprotocol.com/asset/" + props.did} target="_blank">View on Ocean Market</a></div>
            <BookmarkButton did={props.did}></BookmarkButton>
            <OneInchAlertForm setNumAlerts={setNumAlerts} {...props}></OneInchAlertForm>

        </div>
    );
}
export default OneInchAsset;
export { OneInchAsset };