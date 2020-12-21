import React, { useState, useEffect } from 'react';

import Input from './Form/Input.js';
import Button from './Button.js';
import Panel from './Panel.js';

import Accordion from './Accordion';

import './../styles/Market.css';

let MarketAssetList = props => {

    function renderResults() {

        let resultEntries = [];

        // for a single page of results
        for (var i = 0; i < props.results['results'].length; i++) {

            let asset = props.results['results'][i];

            let datatokenSymbol = asset['dataTokenInfo']['symbol'];
            let datatokenPrice = asset['price']['ocean'];
            let assetName = asset['service'][0]['attributes']['main']['name'];
            let assetAuthor = asset['service'][0]['attributes']['main']['author'];
            let assetDesc = asset['service'][0]['attributes']['additionalInformation'] != null ?
                asset['service'][0]['attributes']['additionalInformation']['description'] : "No description availiable";

            let resultEntry =
                    <div label={ assetName + " - " + datatokenSymbol}key={i}>
                        <p>{assetName}</p>
                        <p>{assetDesc}</p>
                    </div>;

            resultEntries.push(resultEntry);
        }

        return resultEntries;
    }

    function toggleCollapse(){
        
    }


    return (
        <div>
            <Accordion allowMultipleOpen>
                {renderResults()}
            </Accordion>
            
        </div>
    );
}

export default MarketAssetList;
export { MarketAssetList };