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

let Wallet = props => {

    let walletPanel = <div>Wallet Panel boi</div>;

    // Determines whether or not the wallet has been connected.
    let { walletConnected: isWalletConnected } = useWalletReady();
    walletPanel = !isWalletConnected ? <ConnectPanel /> : walletPanel;

    return(
        <div id="walletPanel">
            {walletPanel}
        </div>
    );
}

export default Wallet;