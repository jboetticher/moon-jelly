import React, { useState, useEffect } from 'react';
import BookmarkButton from './BookmarkButton.js';

let OneInchAsset = props => {

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