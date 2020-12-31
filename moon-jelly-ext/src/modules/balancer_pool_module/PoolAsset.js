import React, { useState, useEffect } from 'react';
import BookmarkButton from '../../components/BookmarkButton.js';
import { PieChart } from 'react-minimal-pie-chart';

let PoolAsset = props => {
    let [detailed, setDetailed] = useState(false);

    // configures data for display
    const price = props.results[props.key].price;
    const tokenValue = price.value * price.datatoken;
    const totalLiquidityInOcean = price?.ocean + price?.datatoken * price?.value
    console.log(price);
    console.log(props.results);

    function toggleDetailed() {
        setDetailed(!detailed);
    }

    function createLabelExtra() {
        return (
            <>
                <div className="assetLabelPricing">
                    <PieChart data={[
                        { title: "Datatoken", value: tokenValue, color: '#7b1173' },
                        { title: "Ocean", value: price.ocean, color: '#8b98a9' }]}
                        style={{ width: "65px", margin: "inherit" }}
                    //viewBoxSize={[36, 36]}
                    //radius={18}
                    //center={[18, 18]}
                    />
                    <span>
                        <div className="tokenSymbol" style={{ textAlign: "right" }}> {props.datatokenSymbol} </div>
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
                    </span>
                </div>
                {
                    !detailed ? <></> :
                    <div>
                        <div>Total Ocean in Pool: {price.ocean}</div>
                        <div>Total Datatoken in Pool: {price.datatoken}</div>
                    </div>
                }
                <div style={{ margin: "4px" }} />
            </>
        );
    }

    return (
        <div
            label={props.assetName}
            labelExtra={createLabelExtra()}
            className="assetBody"
            key={props.key}
            id={"pool_asset_" + props.key}
        >
            <div><a href={"#pool_asset_" + props.key} onClick={toggleDetailed}>{detailed ? "Hide Details" : "Examine in Detail"}</a></div>
            <div><a href={"https://market.oceanprotocol.com/asset/" + props.did} target="_blank">View on Ocean Market</a></div>
            <BookmarkButton did={props.did} />
        </div>
    );
}
export default PoolAsset;
export { PoolAsset };