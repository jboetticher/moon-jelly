import React, { useEffect, useState } from 'react';
import Button from '../../components/Button.js';
import Input from '../../components/Form/Input.js';
import ConnectPanel from '../../components/ConnectPanel.js';
import Accordion from '../../components/Accordion.js';
import AccordionSection from '../../components/AccordionSection.js';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { useWebStorage } from '../../functionality/WebStorageHooks.js';

import Settings from './assets/settings.svg';
import SlateIcon from './assets/slateicon-32x32.png';

import './slate.css';

const SLATE_API_SECRET_KEY = "slate_api_key";

let SlateFetch = () => {
    const { storeToLocal, getFromLocal } = useWebStorage();
    let [apiKey, setAPIKey] = useState(getFromLocal(SLATE_API_SECRET_KEY));
    let [slateData, setSlateData] = useState(null);
    if(slateData === null) fetchFromSlate();

    useEffect(() => {
        console.log(slateData);
    }, [slateData]);



    //#region Helper Methods

    async function fetchFromSlate() {
        setSlateData(undefined); // sets to undefined so as not to send request too many times
        const response = await fetch('https://slate.host/api/v1/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + apiKey,
            },
            body: JSON.stringify({
                data: {
                    private: true
                }
            })
        });
        const json = await response.json();
        setSlateData(json);
    }

    function knowsSlateAPIKey() {
        const locAPIKEY = getFromLocal(SLATE_API_SECRET_KEY);
        return locAPIKEY !== null && locAPIKEY !== undefined && locAPIKEY !== '';
    }

    //#endregion



    const { walletConnected: isWalletConnected } = useWalletReady();
    let slateComponent = <></>;
    if (!isWalletConnected) {
        slateComponent = <ConnectPanel />;
    }
    else if (!knowsSlateAPIKey()) {
        slateComponent = <>
            Slate Integration
            <form>
                <Input
                    type="text"
                    id="slateAPIKeyInput"
                    placeholder={apiKey ? apiKey : "Input your Slate API key."}
                    value={apiKey}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setAPIKey(value);
                        console.log("set searchterm as", value);
                    }}
                />
                <Button primary padding onClick={(e) => {
                    e.preventDefault();
                    storeToLocal(SLATE_API_SECRET_KEY, apiKey);
                }}>
                    Store Slate API Key
                </Button>
            </form>
        </>;
    }
    else {
        slateComponent =
            <div>
                <image className="settings-button" src={Settings} />
                <div className="mb-2">
                    <image src={SlateIcon} />
                    Slate You Own
                </div>
                <Accordion className="mt-2">{
                    slateData?.slates?.map((x, i) => {
                        { console.log(x); }
                        return (
                            <AccordionSection key={i} label={x.slatename}>
                                <div className="assetBody">
                                    <div className="assetDesc mt-1">{x.data.body}</div>
                                    <div className="slate-button-container">
                                        <Button paddingx>View Slate Items</Button>
                                        <Button paddingx>Go to Slate</Button>
                                    </div>
                                </div>
                            </AccordionSection>
                        );
                    })
                }</Accordion>
                <div className="mt-2">
                    Reset Slate API Key
                    <form>
                        <Input
                            type="text"
                            id="slateAPIKeyInput"
                            placeholder={apiKey ? apiKey : "Input your Slate API key."}
                            value={apiKey}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setAPIKey(value);
                            }}
                        />
                        <Button primary padding onClick={(e) => {
                            e.preventDefault();
                            storeToLocal(SLATE_API_SECRET_KEY, apiKey);
                            var apiInputter = document.getElementById("slateAPIKeyInput");
                            apiInputter.value = "";
                            apiInputter.placeholder = "API Key Set Successfully!";

                            fetchFromSlate();
                        }}>
                            Store Slate API Key
                        </Button>
                    </form>
                </div>
            </div>;
    }

    return (slateComponent);
}

export default SlateFetch;