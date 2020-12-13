import React, { useState, useEffect } from 'react';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';

import Form from '../Form/Form.js';
import Panel from '../Panel.js';
import ConnectPanel from '../ConnectPanel.js';

let Mint = props => {

    // Use this logic to determine whether or not the wallet has been connected.
    let { walletConnected } = useWalletReady();

    let mintPanel = !walletConnected ? <ConnectPanel /> :
        <Panel>
            Mint Data Tokens
            <Form>
                
            </Form>
        </Panel>;

    return (mintPanel);
}

export default Mint;