/* REPLACED BY MORE MODULAR ASSET + ASSETLIST SYSTEM, DO NOT USE */
/* THIS COMPONENT WILL BE DELETED */

import React, { useState, useEffect } from 'react';

import Input from './Form/Input.js';
import Button from './Button.js';
import Panel from './Panel.js';
import BookmarkButton from './BookmarkButton.js';
import Accordion from './Accordion';
import DismissButton from './DismissButton.js';

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
                        labelExtra={createLabelExtra(datatokenSymbol, datatokenPrice, pool, did)}
                        key={i}
                        className="assetBody"
                    >   
                        <div><a href={"https://market.oceanprotocol.com/asset/" + did} target="_blank">View on Ocean Market</a></div>

                        <BookmarkButton did={did}></BookmarkButton>
                        
                        {props.showDismiss ? <DismissButton dismiss={true} did={did}/> : null}
                        
                        {/*<div className="assetDesc mt-1">{assetDesc}</div> */} 

                    </div>;

            resultEntries.push(resultEntry);
        }

        return resultEntries;
    }

    function createLabelExtra(datatokenSymbol, price, pool, did){
        return(
            <div className="assetLabelPricing">
                <div className="tokenSymbol"> {datatokenSymbol} </div>
                <div className="assetPrice tokenSymbol"> 
                    {price != 0 ? 
                        <div>
                            <span className="priceNumber">{price}</span>  
                            <span>OCEAN</span>
                            {pool.length > 0 ? <span className="poolSymbol">POOL</span> : null}
                        </div>
                    :
                        <div>
                            No price data found
                        </div>
                    }

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