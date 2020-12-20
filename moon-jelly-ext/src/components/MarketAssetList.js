import React, { useState, useEffect } from 'react';

import Input from './Form/Input.js';
import Button from './Button.js';
import Panel from './Panel.js';

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
                <div className="assetEntry" key={i}>
                    <button
                        className="button collapseButton"
                    >
                        {datatokenSymbol}
                    </button>
                    <div className="collapseContent">
                        <p>{assetName}</p>
                    </div>
                </div>;

            resultEntries.push(resultEntry);
        }

        return resultEntries;
    }

    function toggleCollapse(){
        
    }


    return (
        <div>
            {renderResults()}
        </div>
    );
}

export default MarketAssetList;
export { MarketAssetList };