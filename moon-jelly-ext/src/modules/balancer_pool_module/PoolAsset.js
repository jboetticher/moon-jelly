import React, { useState, useEffect } from 'react';
import BookmarkButton from '../../components/BookmarkButton.js';
import { PieChart } from 'react-minimal-pie-chart';
import { useOcean } from '@oceanprotocol/react';
import Button from '../../components/Button.js';

let PoolAsset = props => {

    const { ocean, accountId, config } = useOcean();
    let [detailed, setDetailed] = useState(false);
    let [poolPanel, setPoolPanel] = useState("stats");
    const network = config.network;



    // Price Data
    const price = props.results[props.key].price;
    const address = price.address;
    const tokenValue = price.value * price.datatoken;
    const totalLiquidityInOcean = price?.ocean + price?.datatoken * price?.value;

    // Pool Data
    const [swapFee, setSwapFee] = useState();
    const [totalPoolShares, setTotalPoolShares] = useState();
    const [userPoolShares, setUserPoolShares] = useState();
    const [oceanValue, setOceanValue] = useState();
    const [graphData, setGraphData] = useState();

    // Updates all of the pool data
    useEffect(() => {
        async function init() {
            setSwapFee(await ocean.pool.getSwapFee(address));
            setUserPoolShares(await ocean.pool.sharesBalance(ocean.accounts.id, address));
            setTotalPoolShares(await ocean.pool.getPoolSharesTotalSupply(address));
            const oceanPriceJSON = (await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=USD")
                .then(res => res.json()));
            setOceanValue(oceanPriceJSON["ocean-protocol"]["usd"]);
            const graphDataJSON = (await fetch(`https://aquarius.${network}.oceanprotocol.com/api/v1/aquarius/pools/history/${price.address}`)
                .then(res => res.json()));
            setGraphData(graphDataJSON);
        }
        init();
    }, [ocean]);

    console.log("GRAPH DATA", graphData);

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
                        style={{ width: "55px", margin: "inherit", position: "relative", right: "-80px", bottom: "10px" }}
                    //viewBoxSize={[36, 36]}
                    //radius={18}
                    //center={[18, 18]}
                    />
                </div>
                {
                    !detailed ? <></> :
                        <>
                            <div className="gray-line mb-1" />
                            <PoolNavbar setPoolPanel={setPoolPanel} selected={poolPanel} />
                            {createPoolPanel()}
                        </>
                }
                <div style={{ margin: "4px" }} />
            </>
        );
    }

    function createPoolPanel() {
        let panel = <></>;

        switch (poolPanel) {
            case "stats":
                panel =
                    <div className="assetLabelPricing mt-1" style={{ textAlign: 'center' }}>
                        <div className="grid-asset">
                            <div>Pooled OCEAN</div>
                            <div>{price.ocean.toFixed(3)}</div>
                        </div>
                        <div className="grid-asset">
                            <div>Swap Fee</div>
                            <div>{swapFee * 100}%</div>
                        </div>
                        <div className="grid-asset">
                            <div>Pooled {props.datatokenSymbol}</div>
                            <div>{price.datatoken.toFixed(3)}</div>
                        </div>
                        <div className="grid-asset">
                            <div>Pool Shares</div>
                            <div>{parseFloat(totalPoolShares).toFixed(3)}</div>
                        </div>
                        <div className="grid-asset">
                            <div>Total Pool Value</div>
                            <div>≈ ${(totalLiquidityInOcean * oceanValue).toFixed(2)}</div>
                        </div>
                    </div>;
                break;
            case "graph":
                
                break;
            case "liquidity":
                break;
        }

        return panel;
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

let PoolNavbar = props => {
    return (
        <div className="subNav">
            <Button
                primary={props.selected == "stats"} noRound
                onClick={() => props.setPoolPanel('stats')}
            >
                Stats
            </Button>
            <Button
                primary={props.selected == "graph"} noRound
                onClick={() => props.setPoolPanel('graph')}
            >
                Graph
            </Button>
            <Button
                primary={props.selected == "liquidity"} noRound
                onClick={() => props.setPoolPanel('liquidity')}
            >
                Liquidity
            </Button>
        </div>
    );
}

export default PoolAsset;
export { PoolAsset };