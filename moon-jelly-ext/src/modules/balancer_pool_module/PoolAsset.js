import React, { useState, useEffect } from 'react';
import BookmarkButton from '../../components/BookmarkButton.js';
import Input from '../../components/Form/Input.js';
import { PieChart } from 'react-minimal-pie-chart';
import { useOcean } from '@oceanprotocol/react';
import Button from '../../components/Button.js';
import { LineChart } from 'react-chartkick';
import 'chart.js';

let PoolAsset = props => {

    const { ocean, accountId, config } = useOcean();
    let [detailed, setDetailed] = useState(false);
    let [poolPanel, setPoolPanel] = useState("stats");
    const network = config.network;



    // Price Data
    const price = props.results[props.key].price;
    const address = price.address;
    const ownerId = props.results[props.key].dataTokenInfo.minter;
    const tokenValue = price.value * price.datatoken;
    const totalLiquidityInOcean = price?.ocean + price?.datatoken * price?.value;

    // Pool Data
    const [swapFee, setSwapFee] = useState();
    const [totalPoolShares, setTotalPoolShares] = useState();
    const [ownerPoolShares, setOwnerPoolShares] = useState();
    const [userPoolShares, setUserPoolShares] = useState();
    const [oceanValue, setOceanValue] = useState();
    const [graphData, setGraphData] = useState();

    // Updates all of the pool data
    async function init() {
        setSwapFee(await ocean.pool.getSwapFee(address));
        const userPoolSharesPromised = await ocean.pool.sharesBalance(accountId, address);
        setUserPoolShares(parseFloat(userPoolSharesPromised));
        const ownerPoolSharesPromised = await ocean.pool.sharesBalance(ownerId, address);
        setOwnerPoolShares(parseFloat(ownerPoolSharesPromised));
        const totalPoolSharesPromised = await ocean.pool.getPoolSharesTotalSupply(address);
        console.log("total pool shares", totalPoolSharesPromised);
        setTotalPoolShares(parseFloat(totalPoolSharesPromised));
        const oceanPriceJSON = (await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=USD")
            .then(res => res.json()));
        setOceanValue(oceanPriceJSON["ocean-protocol"]["usd"]);
        const graphDataJSON = (await fetch(`https://aquarius.${network}.oceanprotocol.com/api/v1/aquarius/pools/history/${price.address}`)
            .then(res => res.json()));
        setGraphData(graphDataJSON);
    }
    useEffect(() => { init(); }, [ocean]);

    // Liquidity Data
    const [liquidityScreen, setLiquidityScreen] = useState(false);
    const [liquidityInput, setLiquidityInput] = useState();
    const [calculatedShares, setCalculatedShares] = useState();
    const [calculatedPoolPercentage, setCalculatedPoolPercentage] = useState();

    useEffect(() => {
        async function liquidityCalculations() {
            let sharesOutAmount = await ocean.pool.calcPoolOutGivenSingleIn(
                address, // poolAddress
                "0x967da4048cD07aB37855c090aAF366e4ce1b9F48", // tokenInAddress (OCEAN)
                liquidityInput // tokenInAmount
            );
            setCalculatedShares(parseFloat(sharesOutAmount));
        }
        liquidityCalculations();
    }, [liquidityInput]);



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
                        style={{ width: "55px", margin: "inherit", position: "relative", right: "-80px", bottom: "4px" }}
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

    function switchToAddLiquidityScreen() {
        setLiquidityScreen(!liquidityScreen);
    }

    function createPoolPanel() {
        let panel = <></>;

        switch (poolPanel) {
            case "stats":
                panel =
                    <>
                        <div className="text-center grid-asset mt-2 mb-1">
                            {props.datatokenSymbol} Pool Info
                        </div>
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
                                <div>{totalPoolShares.toFixed(3)}</div>
                            </div>
                            <div className="grid-asset">
                                <div>Total Pool Value</div>
                                <div>≈ ${(totalLiquidityInOcean * oceanValue).toFixed(2)}</div>
                            </div>
                        </div>
                    </>;
                break;
            case "graph":
                let graphFormatted = [];
                graphData?.datatokenPriceHistory.forEach(element => {
                    graphFormatted.push([
                        (new Date(element[1] * 1000)).toDateString(),
                        element[0]
                    ]);
                });

                panel =
                    <div>
                        <div className="text-center grid-asset mt-2 mb-1">
                            {props.datatokenSymbol} Price (OCEAN)
                        </div>
                        <LineChart
                            data={graphFormatted}
                            colors={["#7b1173"]}
                            messages={{ empty: "Loading..." }}
                            curve={false}
                            height="160px" />
                    </div>;
                break;
            case "liquidity":
                panel = liquidityScreen ?
                    <>
                        <div className="text-center grid-asset mt-2 mb-1">
                            Add Liquidity to the {props.datatokenSymbol} Pool
                        </div>
                        <div className="assetLabelPricing grid-asset mt-1" style={{ textAlign: 'center' }}>
                            <div>You Recieve:</div>
                            <div>Pool Conversion:</div>
                            <div>{calculatedShares ? calculatedShares?.toFixed(2) : 0} Shares</div>
                            <div>1000 OCEAN</div>
                            <div>{calculatedShares && totalPoolShares ? (calculatedShares / (totalPoolShares + calculatedShares) * 100).toFixed(2) : 0}% of Pool</div>
                            <div>100 {props.datatokenSymbol}</div>
                        </div>
                        <div className="text-center disclaimer-text">
                            Providing liquidity will earn you {swapFee * 100}% on every transaction in this pool,
                            proportionally to your share of the pool.Please understand the
                            <a href="https://blog.oceanprotocol.com/on-staking-on-data-in-ocean-market-3d8e09eb0a13" target="_blank"> Risks </a>
                            and
                            <a href="https://market.oceanprotocol.com/terms" target="_blank"> Terms of Service</a>.
                        </div>
                        <Input
                            type="text"
                            name="liquidityAddition"
                            placeholder={"Add OCEAN to Pool"}
                            value={liquidityInput}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                // only allows numbers and decimals
                                var reg = new RegExp(/^\d*\.?\d*$/);
                                if (reg.test(value)) {
                                    setLiquidityInput(value);
                                }
                            }}
                        />
                        <div className="center-flex-box mt-1 mb-1">
                            <Button paddingx onClick={switchToAddLiquidityScreen}>View Liquidity</Button>
                            <div className="mx-1" />
                            <Button paddingx primary>Confirm</Button>
                        </div>
                        <div className="center-flex-box mt-1 mb-1">
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center grid-asset mt-2 mb-1">
                            {props.datatokenSymbol} Liquidity Info
                        </div>
                        <table className="liquidity-table" style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="grid-header">Yours</th>
                                    <th className="grid-header">Creator's</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-left">Pooled OCEAN</td>
                                    <td>{((userPoolShares / totalPoolShares) * price.ocean).toFixed(2)}</td>
                                    <td>{((ownerPoolShares / totalPoolShares) * price.ocean).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Pooled {props.datatokenSymbol}</td>
                                    <td>{((userPoolShares / totalPoolShares) * price.datatoken).toFixed(2)}</td>
                                    <td>{((ownerPoolShares / totalPoolShares) * price.datatoken).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Pool Share</td>
                                    <td>{(userPoolShares != null && totalPoolShares != null) ? (userPoolShares / totalPoolShares * 100).toFixed(2) : "0"}%</td>
                                    <td>{(ownerPoolShares != null && totalPoolShares != null) ? (ownerPoolShares / totalPoolShares * 100).toFixed(2) : "0"}%</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Shares</td>
                                    <td>{userPoolShares?.toFixed(2)}</td>
                                    <td>{ownerPoolShares?.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="center-flex-box mt-1 mb-1">
                            <Button paddingx onClick={switchToAddLiquidityScreen}>Add Liquidity</Button>
                        </div>
                    </>;
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