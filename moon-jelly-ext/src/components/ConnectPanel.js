import React, { Component, useEffect, useState } from 'react';
import { useWalletReady } from '../functionality/CustomOceanHooks.js';

// Components
import Label from './Label.js';
import Button from './Button.js';
import Panel from './Panel.js';


/**
 * Props:
 * titleText: text to display when opening the page.
 * connectedText: text to display when the connection has been finished.
 */
const ConnectPanel = (props) => {

    // Use this logic to determine whether or not the wallet has been connected.
    /*
    let { connect, status } = useOcean();
    let [oceanConnected, setOceanConnected] = useState(status > 0);
    useEffect(() => {
        setOceanConnected(status > 0);
    }, [status]);
    */

    let {connect, walletConnected} = useWalletReady();

    let noticeText = props?.titleText == null ?
        "Woah there! You need to connect to the wallet before you can do that." :
        props?.titleText;

    if (walletConnected) noticeText = props?.connectedText == null ? "Thanks for connecting!" : props?.connectedText;

    return (
        <Panel>
            <div className={"mt-2"}>
                <Label className={"defaultLabel"}>
                    {noticeText}
                </Label>
                <br />
                <div style={{ height: 15 }} />
                {
                    walletConnected ? <div /> :
                        <Button
                            primary padding
                            type="submit"
                            disabled={walletConnected}
                            onClick={() => {
                                console.log("Showing connect popup.");
                                connect();
                            }}
                        >
                            Connect to Wallet
                        </Button>
                }

            </div>
        </Panel>
    );
}

export default ConnectPanel;