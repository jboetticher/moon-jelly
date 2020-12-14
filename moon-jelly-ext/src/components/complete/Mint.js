import React, { useState, useEffect } from 'react';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { usePublish, usePricing } from '@oceanprotocol/react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';
import Label from '../Label.js';
import ConnectPanel from '../ConnectPanel.js';
import Correct from '../Correct.js';

let Mint = props => {

    // Form data

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
    if (isLoading && publishStepText !== undefined) {
        detailsText = "Publish Step " + publishStep + ": " + publishStepText;
    }
    else if (isLoading && publishStep !== undefined) {
        console.log("Custom text queried.", publishStep === 0 || publishStep === 4)
        if (publishStep === 0 || publishStep === 4) {
            detailsText = "Checking for user authentication..."
        }
    }

    // Use this logic to determine whether or not the wallet has been connected.
    let { walletConnected } = useWalletReady();

    // publish thing
    let publishLoader = <div />;
    if (walletConnected && publishStep >= 7 && !isLoading && ddo != null) {
        publishLoader = <PricingMenu ddo={ddo} />
    }
    else if (walletConnected) {
        if (isLoading) {
            publishLoader =
                <Panel>
                    <Label>
                        {detailsText}
                    </Label>
                    <Correct loadComplete={false} />
                </Panel>
        }
        else {
            publishLoader =
                <Panel>
                    <div className={"mb-2"}>
                        Press the button to start minting!
                    </div>
                    <Button primary padding onClick={() => {
                        handlePublish();
                    }}>
                        Publish
                    </Button>
                </Panel>
        }

        /*
            <Input
                type="text"
                name="address"
                placeholder={address ? address : "Your Wallet Address"}
                value={address}
                help="Enter your valid Ethereum Address"
                onChange={this.handleUserInput.bind(this)}
            />
        */

        //let [url, setURL] = useState("");
        //let [author, setAuthor] = useState("OceanProtocol User");
        //let [name, setName] = useState("My Assets");

        /*
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
        */
    }


    let mintPanel = !walletConnected ? <ConnectPanel /> : publishLoader;

    return (mintPanel);
}

let PricingMenu = props => {

    console.log("ddo in price menu: ", props?.ddo);

    // Pricing helpers
    let [pricingData, setPricingData] = useState([false, "Waiting for Pricing...", 0, undefined]);
    const {
        mint,
        createPricing,
        //buyDT,
        sellDT,
        pricingStep,
        pricingStepText,
        pricingIsLoading,
        pricingError
    } = usePricing(props.ddo);

    // Pricing options
    const priceOptions = {
        price: 1,
        dtAmount: 10,
        oceanAmount: 10,
        type: 'fixed',
        weightOnDataToken: '',
        swapFee: ''
    };

    async function handlePricing() {
        console.log("handlePricing called");
        mint(1000)
            .then(res => {
                console.log("createPricing called with priceOptions: ", priceOptions);
                return createPricing(priceOptions);
            })
    }

    // State data for text later.
    useEffect(() => {
        setPricingData([pricingIsLoading, pricingStepText, pricingStep, pricingError]);
        console.log("pricingIsLoading", pricingIsLoading);
        console.log("pricingStep", pricingStep);
        console.log("pricingStepText", pricingStepText);
        console.log("pricingError", pricingError);
    }, [pricingIsLoading, pricingStep, pricingStepText]);

    // notification text logic
    let detailsText = "Waiting for Pricing...";
    if (pricingIsLoading) {
        detailsText = pricingStepText;
    }

    // changes based on what it's doing
    let pricingSection = <div />;
    if (pricingIsLoading) {
        pricingSection =
            <Panel>
                <Label>
                    {detailsText}
                </Label>
                <Correct loadComplete={false} />
            </Panel>
    }
    else {
        pricingSection =
            <Panel>
                <div className={"mb-2"}>
                    Press the button to start the pricing process!
                </div>
                <Button primary padding onClick={() => {
                    handlePricing()
                }}>
                    Start Pricing
                </Button>
            </Panel>
    }

    return (pricingSection);
}


export default Mint;