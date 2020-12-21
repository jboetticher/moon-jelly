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
            let datatokenPrice = parseFloat(asset['price']['ocean']).toFixed(3);
            let assetName = asset['service'][0]['attributes']['main']['name'];
            let assetAuthor = asset['service'][0]['attributes']['main']['author'];
            let assetDesc = asset['service'][0]['attributes']['additionalInformation'] != null ?
                asset['service'][0]['attributes']['additionalInformation']['description'] : "No description availiable";
            let did = asset['id'];

            let resultEntry =
                    <div 
                        label={datatokenSymbol} 
                        labelExtra={createLabelExtra(assetName, assetAuthor, datatokenPrice)}
                        key={i}
                        className="assetBody"
                    >   
                        <a className="mt-1" href={"https://market.oceanprotocol.com/asset/" + did} target="_blank">View on Ocean Market</a>

                        <div className="assetDesc mt-1">{assetDesc}</div>   
                    </div>;

            resultEntries.push(resultEntry);
        }

        return resultEntries;
    }

    function createLabelExtra(name, author, price){
        return(
            <div className="assetInfo">
                <div className="assetName">{name}</div>
                <div className="assetAuthor">{author}</div> 
                <div className="assetPrice">{price}  <span className="tokenSymbol">OCEAN</span></div>              
            </div>


            
        );
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