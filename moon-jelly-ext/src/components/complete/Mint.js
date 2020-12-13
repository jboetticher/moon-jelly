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
    let { publish, publishStep, publishStepText, isLoading }
        = usePublish();
    let [ddo, setddo] = useState(null);
    useEffect(() => {
        console.log("isLoading", isLoading);
        console.log("publishStep", publishStep);
        console.log("publishStepText", publishStepText);
        console.log("open pricing menu", walletConnected, publishStep >= 7, !isLoading);
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
        }, 'access')
            .then((resDDO) => {
                console.log("Publish was successful. Now moving on to pricing.", resDDO);
                setddo(resDDO);
            });
    }


    let detailsText = "Waiting for Publishing...";
    if (isLoading && (publishStepText !== undefined || publishStep !== undefined)) {
        detailsText = "Publish Step " + publishStep + ": " + publishStepText;
    }

    // Use this logic to determine whether or not the wallet has been connected.
    let { walletConnected } = useWalletReady();

    // publish thing
    let publishLoader = <div />;
    if (walletConnected && publishStep >= 7 && !isLoading && ddo != null) {
        publishLoader = <PricingMenu ddo={ddo} />
    }
    else if (walletConnected) 
    {
        publishLoader =
        <Panel>
            <Label>
                {detailsText}
            </Label>
            <Button primary padding onClick={() => {
                handlePublish()
            }}>
                Publish
            </Button>
            <div className={"loader"}></div>
        </Panel>
    }


    let mintPanel = !walletConnected ? <ConnectPanel /> : publishLoader;

    return (mintPanel);
}

let PricingMenu = props => {

    console.log("ddo in price menu: ", props?.ddo);

    // Pricing options
    const priceOptions = {
        price: 10,
        dtAmount: 10,
        type: 'fixed',
        weightOnDataToken: '',
        swapFee: ''
    };

    // Pricing helpers
    let [pricingData, setPricingData] = useState([false, "Waiting for Pricing...", 0]);
    const {
        mint,
        createPricing,
        buyDT,
        sellDT,
        pricingStep,
        pricingStepText,
        pricingIsLoading,
        pricingError
    } = usePricing(props.ddo);


    async function handlePricing() {
        mint(1000)
            .then(res => {
                return createPricing(priceOptions);
            })
    }

    // State data for text later.
    useEffect(() => {
        setPricingData([pricingIsLoading, pricingStep, pricingStepText]);
    }, [pricingIsLoading, pricingStep, pricingStepText]);

    // notification text logic
    let detailsText = "Waiting for Pricing...";
    if (pricingIsLoading && pricingStep > 0) {
        detailsText = "Pricing Step " + pricingStep + ": " + pricingStepText;
    }

    console.log("pricing mennooo");

    return (
        <div>
            <Label>
                {detailsText}
            </Label>
            <Button primary padding onClick={() => {
                handlePricing()
            }}>
                Start Pricing
            </Button>
        </div>
    );
}


export default Mint;