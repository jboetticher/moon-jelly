import React, { useState, useEffect } from 'react';
import Input from '../../components/Form/Input.js';
import Button from '../../components/Button.js';
import AssetList from '../../components/AssetList.js';
import Correct from '../../components/Correct.js';

import Tokens from './assets/tokens.json';
import OneInchAsset from './OneInchAsset.js';

import { useBookmarks } from '../../functionality/BookmarkHooks.js';

let OneInchPanel = props => {

    const { getBookmarkDDOs } = useBookmarks();

    // Array of all swapabble tokens
    const availiableTokens = getTokenArray();

    // Default set to ETH
    let [fromToken, setFromToken] = useState("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    // Keeps track of 1inch fetched conversion rate between fromToken and OCEAN 
    let [convRate, setConvRate] = useState(null);

    // Keeps track of fetched asset data 
    let [assetResults, setAssetResults] = useState("");

    // Runs once
    useEffect(() => {
        console.log("helo")

        // sets the conversion rate between ocean and specified token
        quoteFetch(1).then(res => {
            // Amount of ocean you'll get for 1 fromToken
            console.log("got the 1inch data", res);
            setConvRate(res['toTokenAmount'] / 10 ** 18);     
        });

        // sets the bookmarks to render
        if (getBookmarkDDOs() != null) {
            getBookmarkDDOs().then((values) => {
                console.log("got the bookmark data", values);
                setAssetResults(values);
            });
        }

    }, []);

    /*useEffect(() => {
        console.log("it has changed", convRate);
    }, [convRate]);*/


    // Parses JSON file into an Javascript array of JSON objects
    function getTokenArray() {
        let tokenArray = [];

        for (var i in Tokens['tokens']) {
            tokenArray.push(Tokens['tokens'][i]);
        }
        return tokenArray;
    }

    // Fetches a quote from 1inch using OCEAN as the toToken
    // fromTokenAmount is the true number of tokens you want to check (decimals are added in the function)
    // Returns a promise to evaluate for the JSON response
    function quoteFetch(fromTokenAmount) {

        // Number of minimal divisible units of the token
        let decimals = Tokens['tokens'][fromToken]['decimals'];

        // Add the correct number of decimals to the provided token amount
        let decimaledAmount = fromTokenAmount * 10 ** decimals;

        // toTokenAddress is OCEAN
        let reqURL = "https://api.1inch.exchange/v2.0/quote?fromTokenAddress="
            + fromToken +
            "&toTokenAddress=0x967da4048cd07ab37855c090aaf366e4ce1b9f48&amount="
            + decimaledAmount;

        return fetch(reqURL).then(res => res.json());
    }



    //#region Rendering


    /*function evalBookmarkDDOs() {
        // if it's empty, return
        if (getBookmarkDDOs() == null) return;

        getBookmarkDDOs().then((values) => {
            console.log(values);
            setAssetResults(values);
        });
    }*/

    /*function renderBookmarks() {
        // if asset results is empty, fetch it
        if (assetResults == "") {
            evalBookmarkDDOs();
            console.log("rendering bookmarks in 1inch");
        }
        return (
            assetResults != "" ? <AssetList results={assetResults} token={Tokens['tokens'][fromToken]['symbol']} convRate={convRate}
                assetEntry={OneInchAsset}> </AssetList> : null
        );
    }*/
    //#endregion

    function renderBookmarks() {
        if (convRate == null) {
            return <Correct />
        }
        else {
            return (
                <div>
                    <div> Bookmark Analysis</div>
                    <div> Best Swap on 1inch Exchange:</div>
                    <div> 1 {Tokens['tokens'][fromToken]['symbol']} = {convRate.toPrecision(6)} OCEAN </div>
                    <AssetList results={assetResults} token={Tokens['tokens'][fromToken]['symbol']} convRate={convRate}
                        assetEntry={OneInchAsset}> </AssetList>
                </div>
            );
        }
    }

    return (
        <div className="oneInchPanel">
            <Button
                onClick={() => {
                    setFromToken("0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a");
                    quoteFetch(3).then(data => console.log(data));
                }}
            >
                token data
            </Button>
            {renderBookmarks()}

        </div>
    );
}

export default OneInchPanel;
export { OneInchPanel }