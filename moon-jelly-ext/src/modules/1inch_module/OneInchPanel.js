    /*global chrome*/
import React, { useState, useEffect } from 'react';
import Input from '../../components/Form/Input.js';
import Button from '../../components/Button.js';
import AssetList from '../../components/AssetList.js';
import Correct from '../../components/Correct.js';

import Tokens from './assets/tokens.json';
import OneInchAsset from './OneInchAsset.js';

import TokenSelectSearch from './TokenSelectSearch.js';
import './SelectSearch.css';

import InchIcon from './assets/1inch_icon.png';
import InchBanner from './assets/1inch_banner.png';
import './OneInchPanel.css';

import { useBookmarks } from '../../functionality/BookmarkHooks.js';
import { useWebStorage } from '../../functionality/WebStorageHooks.js';
import { useOcean } from '@oceanprotocol/react';

let OneInchPanel = props => {

    const network = useOcean()['config']['network'];
    const { getBookmarkDDOs } = useBookmarks();
    const { storeArrayToLocal, getArrayFromLocal } = useWebStorage(); 

    // Array of all swapabble tokens
    //const availiableTokens = getTokenArray();

    // Default set to ETH
    let [fromToken, setFromToken] = useState("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    // Keeps track of 1inch fetched conversion rate between fromToken and OCEAN
    // Ex. 1 ETH = 2223 OCEAN, 2223 is the convRate 
    let [convRate, setConvRate] = useState(null);

    // Keeps track of whether to show loader or not
    let [showLoader, setShowLoader] = useState("true");

    // Keeps track of fetched asset data 
    let [assetResults, setAssetResults] = useState("");

    // Runs once
    useEffect(() => {
        console.log("running once");

        // First, check if there are bookmarks to analyze
        if (getBookmarkDDOs() != null) {
            getBookmarkDDOs()
                .then((values) => {
                    // Save the Bookmark DDOs 
                    console.log("got the bookmark data", values);
                    return setAssetResults(values);
                })
                .then(() => {
                    // creates an empty array in storage for alerts if it was null
                   if (getArrayFromLocal("oneInchAlertList_" + network) == null) storeArrayToLocal("oneInchAlertList_" + network, []);
                })
                .then(() => {
                    // Then start fetching 1inch data
                    console.log("fetching 1inch data...")
                    return quoteFetch(1);
                })
                .then(res => {
                    // Save 1inch data when it is fetched
                    console.log("got the 1inch data", res);
                    return setConvRate(res['toTokenAmount'] / 10 ** 18);
                })
                .then(() => {
                    // Finally, turn off the loader icon
                    console.log("disable loader");
                    setShowLoader(false);
                });
        }



    }, []);

    // When the selected token changes
    useEffect(() => {
        console.log("token selection changed");
        // sets the conversion rate between ocean and specified token
        quoteFetch(1).then(res => {
            // Amount of ocean you'll get for 1 fromToken
            console.log("got the new 1inch data for new token", res);
            setConvRate(res['toTokenAmount'] / 10 ** 18);
        })
            .then(() => {
                setShowLoader(false);
            });

    }, [fromToken]);


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

    function renderBody() {
        if (convRate == null || showLoader == true) {
            return <Correct />
        }
        else {
            return (
                <div className="mt-2" >
                    {/*<div className="mt-2">Current Rate on 1inch Exchange:</div>*/}
                    <a href={"https://1inch.exchange/#/" + Tokens['tokens'][fromToken]['symbol'] + "/OCEAN"} target="_blank"> Current Rate on 1inch Exchange: </a>
                    <div> (1 {Tokens['tokens'][fromToken]['symbol']} = {convRate.toPrecision(6)} OCEAN)</div>
                    <AssetList results={assetResults} token={Tokens['tokens'][fromToken]['symbol']} convRate={convRate} tokenAddress={fromToken}
                        assetEntry={OneInchAsset}> </AssetList>
                </div>
            );
        }
    }

    return (
        <div className="oneInchPanel">
            {/*<Button
                onClick={() => {
                    chrome.runtime.sendMessage({name: "storageUpdate"});
                }}
            >
                refresh for notifications
            </Button>*/}
            <div className="gradient-banner-wrap">
                <a href="https://1inch.exchange/#/" target="_blank">
                    <img src={InchBanner} style={{borderRadius: "0.2rem"}}/>
                </a>
            </div>

            <div className="mt-2"> Compare bookmarks to: </div>
            <div className="gradient-banner-wrap">
            <TokenSelectSearch
                onChange={(value) => {
                    console.log("selected", value);
                    setFromToken(value);
                    setShowLoader(true);
                }}
            />
            </div>
            {renderBody()}

        </div>
    );
}

export default OneInchPanel;
export { OneInchPanel }