import React, { useState, useEffect } from 'react';
import Accordion from './Accordion';

// import asset list css


// props.results - the results section of a page query from aquarius, i.e. an array of DDOs
// props.assetEntry - the display component of an asset (MarketAsset, AlertAsset, CustomAsset, etc)
let AssetList = props => {

    // create a list of assets
    function renderAssetEntries() {

        // No DDOS in the array
        if(props.results == null) return;
        else if(props.results.length == 0) return;

        let resultEntries = [];

        // Loops through the array of DDOs
        for (var i = 0; i < props.results.length; i++) {

            // The current DDO
            let asset = props.results[i];

            // Get the relevant data from each DDO
            let datatokenSymbol = asset['dataTokenInfo']['symbol'];
            let datatokenPrice = parseFloat(asset['price']['value']).toFixed(3);
            let assetName = asset['service'][0]['attributes']['main']['name'];
            let assetAuthor = asset['service'][0]['attributes']['main']['author'];
            let assetDesc = asset['service'][0]['attributes']['additionalInformation'] != null ?
                asset['service'][0]['attributes']['additionalInformation']['description'] : "No description availiable";
            let pool = asset['price']['pools'];
            let did = asset['id'];

            // Pass in the relevant parsed data to the assetEntry component
            // Also passes in the DDO array itself (with ...props)
            let resultEntry = props.assetEntry({
                datatokenSymbol: datatokenSymbol,
                datatokenPrice: datatokenPrice,
                assetName: assetName,
                assetAuthor: assetAuthor,
                assetDesc: assetDesc,
                pool: pool,
                did: did,
                key: i,
                ...props
            });

            //
            resultEntries.push(resultEntry);
        }

        return resultEntries;
    }

    return (
        <div>
            <Accordion allowMultipleOpen>
                {renderAssetEntries()}
            </Accordion>

        </div>
    );
}

export default AssetList;
export { AssetList };
