import React, { useState, useEffect } from 'react';
import { usePublish, usePricing } from '@oceanprotocol/react';
import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import CryptoJS from '../../../node_modules/crypto-js';

import Panel from '../Panel.js';
import Label from '../Label.js';
import Button from '../Button.js';
import Correct from '../Correct.js';
import Input from '../Form/Input.js';
import ConnectPanel from '../ConnectPanel.js';

let Mint = props => {

    // Form data
    let [url, setURL] = useState("");
    let [author, setAuthor] = useState("");
    let [urlData, setURLData] = useState("");
    let [dataname, setDataName] = useState("");
    let [description, setDescription] = useState("");

    //#region Publish Helpers

    let { publish, publishStep, publishStepText, isLoading, publishError }
        = usePublish();
    let [ddo, setddo] = useState(null);
    useEffect(() => {
        console.log("isLoading", isLoading);
        console.log("publishStep", publishStep);
        console.log("publishStepText", publishStepText);
        console.log("publishError", publishError);
    }, [isLoading, publishStep, publishStepText]);

    async function handlePublish() {
        console.log("publish urlData ", urlData);
        const ddo = await publish({
            main: {
                type: 'dataset',
                name: dataname,
                dateCreated: new Date(Date.now()).toISOString().split('.')[0] + 'Z', // remove milliseconds
                author: author,
                license: 'MIT',
                files: [{
                    url: url, //'https://raw.githubusercontent.com/tbertinmahieux/MSongsDB/master/Tasks_Demos/CoverSongs/shs_dataset_test.txt',
                    checksum: urlData.checksum, //'efb2c764274b745f5fc37f97c6b0e761',
                    contentLength: urlData.contentLength,//'4535431',
                    contentType: urlData.contentType,//'text/csv',
                    encoding: urlData.encoding,//'UTF-8',
                    compression: urlData.compression//'zip'
                }]
            },
            additionalInformation: {
                description: description
            }
        }, 'access')
            .then((resDDO) => {
                console.log("Publish was successful. Now moving on to pricing.", resDDO);
                setddo(resDDO);
            });
    }

    //#endregion

    //#region  Validation Functions

    function isValidUrl(url) {
        var pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
            'i'
        ) // fragment locator
        return !!pattern.test(url)
    }

    /**
     * Attempts to put file data into the urlData state from the url, but currently sets it all to "" because that's the only way we could make it work. =(
     * @param {the url to parse through} str 
     */
    async function parseURLData(str) {
        if (isValidUrl(str)) {
            const request = new Request(str);
            try {
                setURLData(null);
                let recievedURLData = { checksum: "", contentLength: "", contentType: "", encoding: "", compression: "" };
                const response = await fetch(request);
                console.log(response);
                if (!response.ok) throw new Error("There was an issue with the code of the response.");

                /*
                let blob = await response.blob();
                console.log(blob);
                //recievedURLData.contentLength = blob.size;
                //recievedURLData.contentType = blob.type; 
                //recievedURLData.encoding = "UTC-8"; 
                //recievedURLData.compression = "zip"; 

                var a = new FileReader();
                await new Promise((resolve, reject) => {
                    a.readAsBinaryString(blob);
                    
                    a.onerror = () => {
                        a.abort();
                        reject(new DOMException("Problem parsing input file!"));
                    };
                    
                    a.onloadend = () => {
                        resolve();
                    };       
                });
                //recievedURLData.checksum = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(a.result)).toString();
                */

                // attempts to get file type and charset
                await new Promise((resolve, reject) => {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open('HEAD', url);
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == this.DONE) {
                            console.log(this.status);
                            console.log(this.getResponseHeader("Content-Type"));
                            console.log(this.getAllResponseHeaders());
                            resolve();
                        }
                    };
                    xhttp.onerror = function() {
                        xhttp.abort();
                        reject(new DOMException("Problem requesting HEAD!"));
                    }
                    xhttp.send();
                });



                //console.log("recievedURL being used", recievedURLData);
                setURLData(recievedURLData);
            }
            catch (e) {
                console.log("Error with getting data from the URL:", e);
                setURLData(null);
            }
        }
        else {
            setURLData("null");
        }
    }

    function isFormValid() {
        console.log("url", url);
        console.log("author", author);
        console.log("dataname", dataname);
        console.log("urlData", null);

        return url !== "" && author != "" && dataname != "" && urlData != null;
    }

    //#endregion

    // Determines whether or not the wallet has been connected.
    let { walletConnected: isWalletConnected } = useWalletReady();

    // Figures out what to display based on which step in publishing it's in.
    let publishLoader = <div />;
    if (isWalletConnected && publishStep >= 7 && !isLoading && ddo != null) {
        publishLoader = <PricingMenu ddo={ddo} />
    }
    else if (isWalletConnected) {
        if (isLoading) {

            let detailsText = "Waiting for Publishing...";
            if (publishStepText !== undefined) {
                detailsText = "Publish Step " + publishStep + ": " + publishStepText;
            }
            else if (publishStep !== undefined) {
                console.log("Custom text queried.", publishStep === 0 || publishStep === 4)
                if (publishStep === 0 || publishStep === 4) {
                    detailsText = "Checking for user authentication..."
                }
            }

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
                    <form className={"form"}>
                        <Input
                            type="text"
                            name="dataname"
                            placeholder={dataname ? dataname : "My Assets"}
                            value={dataname}
                            help="Enter the name of your dataset."
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setDataName(value)
                            }}
                        />
                        <Input
                            type="text"
                            name="dataurl"
                            placeholder={url ? url : "Data URL"}
                            value={url}
                            help="Enter the link to your the data."
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setURL(value);
                                parseURLData(value);
                            }}
                        />
                        <Input
                            type="text"
                            name="author"
                            placeholder={author ? author : "Author Name"}
                            value={author}
                            help="Enter the name of the data set's author (displayed on the Ocean Market)."
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setAuthor(value)
                            }}
                        />
                        <Input
                            type="text"
                            name="author"
                            placeholder={description ? description : "Data Description"}
                            value={description}
                            help="Enter the description of the data set."
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setDescription(value)
                            }}
                        />
                        <div className={"mb-2"}>
                            Press the button to start minting!
                    </div>
                        <Button primary padding type="submit" disabled={!isFormValid()}
                            onClick={() => {
                                handlePublish();
                            }
                            }>
                            Publish
                    </Button>
                    </form>
                </Panel>
        }
    }

    let mintPanel = !isWalletConnected ? <ConnectPanel /> : publishLoader;
    return (mintPanel);
}

let PricingMenu = props => {

    console.log("ddo in price menu: ", props?.ddo);

    // Pricing helpers
    let [price, setPrice] = useState(1);
    let [dtAmount, setDTAmount] = useState(500);

    // Pricing helpers
    let [pricingData, setPricingData] = useState([false, "Waiting for Pricing...", 0, undefined]);
    const {
        //mint,
        createPricing,
        //buyDT,
        //sellDT,
        pricingStep,
        pricingStepText,
        pricingIsLoading,
        pricingError
    } = usePricing(props.ddo);

    // Pricing options
    let priceOptions = {
        type: 'fixed',
        price: price,
        dtAmount: dtAmount,
        oceanAmount: 0,
        weightOnDataToken: '',
        swapFee: ''
    };

    async function handlePricing() {
        console.log("handlePricing called");

        console.log("createPricing called with priceOptions: ", priceOptions);
        createPricing(priceOptions);
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
                <Input
                    type="text"
                    name="price"
                    placeholder={price ? price : 1}
                    value={price}
                    help="Enter the price of your datatoken."
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setPrice(value)
                    }}
                />
                <Input
                    type="text"
                    name="price"
                    placeholder={dtAmount ? dtAmount : 500}
                    value={dtAmount}
                    help="Enter the amount of datatokens that ocean can sell."
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setDTAmount(value)
                    }}
                />
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