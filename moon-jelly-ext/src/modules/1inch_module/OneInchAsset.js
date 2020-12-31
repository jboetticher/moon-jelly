import React, { useState, useEffect } from 'react';
import BookmarkButton from '../../components/BookmarkButton.js';

import './OneInchAsset.css';

let OneInchAsset = props => {

    /*function calcConversion() {
        // change to full untruncated price later for accuracy
        let fullOceanPrice = props.datatokenPrice;

        let convertedPrice;
        props.tokenRate.then(res => {
            convertedPrice = fullOceanPrice / (res['toTokenAmount'] / 10**18);
            console.log("in asset", res);
            console.log("it is worth about", convertedPrice);
        });
        return convertedPrice;
    }*/

    function createLabelExtra() {
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
                        <span className="priceNumber">{props.datatokenPrice / props.convRate}</span>
                        <span>{props.token}</span>
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

        </div>
    );
}
export default OneInchAsset;
export { OneInchAsset };