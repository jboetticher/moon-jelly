import React, { useState, useEffect } from 'react';
import BookmarkButton from '../../components/BookmarkButton.js';
import { PieChart } from 'react-minimal-pie-chart';
import { useOcean } from '@oceanprotocol/react';

let PoolAsset = props => {
    let [detailed, setDetailed] = useState(false);

    // configures data for display
    const price = props.results[props.key].price;
    const pAddress = price.address;
    const tokenValue = price.value * price.datatoken;
    const totalLiquidityInOcean = price?.ocean + price?.datatoken * price?.value;

    // pool.getPoolDetails doesn't return anything apparently
    // ocean.pool.getPoolDetails("0xAa7D8BB70cfb03454e0684B87182a241E2aB01B8").then(res => console.log("pool details", res));

    const { ocean, accountId } = useOcean();
    console.log(ocean.pool);
    console.log(price);

    // yep i sure have 0 shares
    ocean.pool.sharesBalance(accountId, pAddress)
        .then(res => console.log("pool details", res));

    /*
    const totalPoolSharesInSupply = 
        ocean.pool.getPoolSharesTotalSupply(price.address)
        .then(res => console.log("total pool shares", res));    
    */

    const userPoolShares =
        ocean.pool.sharesBalance(ocean.accounts.id, price.address)
            .then(res => console.log("user pool shares", res));



    function toggleDetailed() {
        setDetailed(!detailed);
    }

    function createLabelExtra() {
        return (
            <>
                <div className="assetLabelPricing">
                    <span>
                        <div className="tokenSymbol" style={{ textAlign: "left" }}> {props.datatokenSymbol} </div>
                        <div className="assetPrice tokenSymbol">
                            {props.datatokenPrice != 0 ?
                                <div style={{ textAlign: "left" }}>
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
                    <PieChart data={[
                        { title: props.datatokenSymbol, value: tokenValue, color: '#7b1173' },
                        { title: "Ocean", value: price.ocean, color: '#8b98a9' }]}
                        style={{ width: "65px", margin: "inherit", position: "relative", right: "-75px", bottom: "10px" }}
                    //viewBoxSize={[36, 36]}
                    //radius={18}
                    //center={[18, 18]}
                    />
                </div>
                {
                    !detailed ? <></> :
                        <>
                            <div>Pool Statistics</div>
                            <div className="assetLabelPricing mt-1" style={{ textAlign: 'center' }}>
                                <div className="tokenSymbol">
                                    <div>Pooled OCEAN</div>
                                    <div>{price.ocean.toFixed(3)}</div>
                                </div>
                                <div className="tokenSymbol">
                                    <div>Pooled {props.datatokenSymbol}</div>
                                    <div>{price.datatoken.toFixed(3)}</div>
                                </div>
                            </div>
                        </>
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