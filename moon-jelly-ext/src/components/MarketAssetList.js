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
            let datatokenPrice = parseFloat(asset['price']['value']).toFixed(3);
            let assetName = asset['service'][0]['attributes']['main']['name'];
            let assetAuthor = asset['service'][0]['attributes']['main']['author'];
            let assetDesc = asset['service'][0]['attributes']['additionalInformation'] != null ?
                asset['service'][0]['attributes']['additionalInformation']['description'] : "No description availiable";
            let pool = asset['price']['pools'];
            let did = asset['id'];

            let resultEntry =
                    <div 
                        //label={datatokenSymbol}
                        label={assetName} 
                        labelExtra={createLabelExtra(datatokenSymbol, datatokenPrice, pool)}
                        key={i}
                        className="assetBody"
                    >   
                        <a className="mt-1" href={"https://market.oceanprotocol.com/asset/" + did} target="_blank">View on Ocean Market</a>

                        {/*<div className="assetDesc mt-1">{assetDesc}</div> */} 
                    </div>;

            resultEntries.push(resultEntry);
        }

        return resultEntries;
    }

    function createLabelExtra(datatokenSymbol, price, pool){
        return(
            <div className="assetLabelPricing">
                {/*<div className="assetName">{name}</div>
                <div className="assetAuthor">{author}</div> */}
                <div className="tokenSymbol"> {datatokenSymbol} </div>
                <div className="assetPrice tokenSymbol"> 
                    <span className="priceNumber">{price}</span>  
                    <span>OCEAN</span>
                    {pool.length > 0 ? <span className="poolSymbol">POOL</span> : null}
                </div>              
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