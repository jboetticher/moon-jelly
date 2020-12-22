import React, { useState } from 'react'
import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { useWebStorage } from '../../functionality/WebStorageHooks.js';

import Correct from '../Correct'
import Incorrect from '../Incorrect'
import Button from '../Button'
import Input from '../../components/Form/Input'
import Form from '../../components/Form/Form'
import * as ethereumAddress from 'ethereum-address'
import '../../styles/DataWallet.css';
import ConnectPanel from '../ConnectPanel.js';
import Panel from '../Panel.js';

import MarketAssetList from '../MarketAssetList';

import { useOcean } from '@oceanprotocol/react';
import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'

let Wallet = props => {

    const { accountId } = useOcean();
    const { fetchDataByWallet } = useAquariusFetch();

    // Keeps track of fetched asset data 
    let [assetResults, setAssetResults] = useState("");

    function renderWalletAssets() {
        if(accountId == null) return "accoutn not linked";

        // if asset results is empty, fetch it
        if(assetResults == ""){
            fetchDataByWallet("rinkeby", accountId).then(res => {
                console.log("wallet stuff", res);
                setAssetResults(res);
            });
        }
        
        return (
            assetResults != "" ? <div> <div>My Published Assets</div> <MarketAssetList results={assetResults}> </MarketAssetList> </div> : null
        );
    }

    let walletPanel = <div>Wallet Panel boi</div>;

    // Determines whether or not the wallet has been connected.
    let { walletConnected: isWalletConnected } = useWalletReady();
    walletPanel = !isWalletConnected ? <ConnectPanel /> : walletPanel;

    return (
        <div id="walletPanel">
            <Panel>
                {walletPanel}

                
                {renderWalletAssets()}
            </Panel>
        </div>
    );
}

export default Wallet;