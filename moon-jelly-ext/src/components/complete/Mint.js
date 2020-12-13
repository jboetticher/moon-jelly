import React, { useState, useEffect } from 'react';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { usePublish, usePricing } from '@oceanprotocol/react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';
import Label from '../Label.js';
import ConnectPanel from '../ConnectPanel.js';

let Mint = props => {

    // Publish helpers
    let { publish, publishStep, publishStepText, isLoading, publishError }
        = usePublish();
    useEffect(() => {
        console.log("isLoading", isLoading);
        console.log("publishStep", publishStep);
        console.log("publishStepText", publishStepText);
    }, [isLoading, publishStep, publishStepText]);

    async function handlePublish() {
        const ddo = await publish({
            main: {
                type: 'dataset',
                name: "Jeremy's Assets uwu",
                author: "jeremy",
                license: 'MIT',
                files: [{
                    url: 'https://raw.githubusercontent.com/tbertinmahieux/MSongsDB/master/Tasks_Demos/CoverSongs/shs_dataset_test.txt',
                    checksum: 'efb2c764274b745f5fc37f97c6b0e761',
                    contentLength: '4535431',
                    contentType: 'text/csv',
                    encoding: 'UTF-8',
                    compression: 'zip'
                }]
            },
            additionalInformation: {
                description: 'Test Asset by Jeremy from MoonJelly (coming soon)'
            }
        }, 'access').
            then((res) => console.log('big pog then', res));

        /*
        console.log(ddo);

        // Heads Up! You should now create pricing for your data set
        // with the `usePricing()` hook in another step.
        // Pricing helpers
        const {
            createPricing,
            buyDT,
            sellDT,
            pricingStepText,
            pricingError
        } = usePricing(ddo)
        */
    }


    // Use this logic to determine whether or not the wallet has been connected.
    let { walletConnected } = useWalletReady();

    let mintPanel = !walletConnected ? <ConnectPanel /> :
        <Panel>
            <Label>
                {publishStepText === undefined ? "Waiting..." : publishStepText}
            </Label>
            <Button primary padding onClick={() => {
                handlePublish()
            }}>
                Publish
            </Button>
        </Panel>;

    return (mintPanel);
}


export default Mint;