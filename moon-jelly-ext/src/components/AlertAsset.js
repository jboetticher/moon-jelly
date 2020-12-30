import React, { useState, useEffect } from 'react';
import BookmarkButton from './BookmarkButton.js';
import DismissButton from './DismissButton.js';

let AlertAsset = props => {

    function createLabelExtra() {
        return (
            <div className="assetLabelPricing">
                <div className="tokenSymbol"> {props.datatokenSymbol} </div>
                <div className="assetPrice tokenSymbol">
                    {props.price != 0 ?
                        <div>
                            <span className="priceNumber">{props.price}</span>
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
        >
            <div><a href={"https://market.oceanprotocol.com/asset/" + props.did} target="_blank">View on Ocean Market</a></div>

            <BookmarkButton did={props.did}></BookmarkButton>
            <DismissButton dismiss={true} did={props.did}> </DismissButton>

        </div>
    );
}
export default AlertAsset;
export { AlertAsset };