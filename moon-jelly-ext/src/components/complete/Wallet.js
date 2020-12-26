import React, { useState } from 'react'
import { useWalletReady } from '../../functionality/CustomOceanHooks.js';

import '../../styles/DataWallet.css';
import ConnectPanel from '../ConnectPanel.js';
import Panel from '../Panel.js';
import MarketNavbar from '../MarketNavbar.js';

import MarketAssetList from '../MarketAssetList';

import { useOcean } from '@oceanprotocol/react';
import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'


let Wallet = props => {

    const { balance, accountId } = useOcean();
    const { fetchDataByWallet } = useAquariusFetch();

    // Keeps track of fetched asset data 
    let [assetResults, setAssetResults] = useState("");

    function renderPublishedWalletAssets() {
        if (accountId == null) return /*"account not linked"*/;

        // if asset results is empty, fetch it
        if (assetResults == "") {
            fetchDataByWallet(/*"rinkeby",*/ accountId).then(res => {
                //console.log("wallet stuff", res);
                setAssetResults(res);
            });
        }

        return (
            assetResults != "" ? <div> <MarketAssetList results={assetResults}> </MarketAssetList> </div> : null
        );
    }

    function renderWalletBalance(){
        console.log(balance);
        return(
            <div className="mt-2">
                <div>My Published Assets</div> 
                <div className="walletBalance mt-1">
                    <div className="tokenSymbol">{parseFloat(balance['ocean']).toFixed(3)} OCEAN</div>
                    <div className="tokenSymbol">{parseFloat(balance['eth']).toFixed(3)} ETH</div>
                </div>
            </div>
        );
    }

    let walletPanel =
        <div>
            {renderWalletBalance()}
            {renderPublishedWalletAssets()}
        </div>;

    // Determines whether or not the wallet has been connected.
    let { walletConnected: isWalletConnected } = useWalletReady();
    walletPanel = !isWalletConnected ? <ConnectPanel /> : walletPanel;

    return (
        <div id="walletPanel">
            <Panel>
                <MarketNavbar selected="wallet"/>
                {walletPanel}        
            </Panel>
        </div>
    );
}

export default Wallet;