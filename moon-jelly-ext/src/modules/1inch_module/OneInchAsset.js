import React, { useState, useEffect } from 'react';
import BookmarkButton from '../../components/BookmarkButton.js';
import OneInchAlertForm from './OneInchAlertForm.js';

import './OneInchAsset.css';

let OneInchAsset = props => {

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
            <OneInchAlertForm {...props}></OneInchAlertForm>

        </div>
    );
}
export default OneInchAsset;
export { OneInchAsset };