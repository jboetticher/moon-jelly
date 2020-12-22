import React, { useEffect, useState } from 'react';
import Button from '../../components/Button.js';
import Input from '../../components/Form/Input.js';
import ConnectPanel from '../../components/ConnectPanel.js';
import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { useWebStorage } from '../../functionality/WebStorageHooks.js';
import Settings from './settings.svg';
import './slate.css';
import Accordion from '../../components/Accordion.js';
import AccordionSection from '../../components/AccordionSection.js';

const SLATE_API_SECRET_KEY = "slate_api_key";

let SlateFetch = () => {
    const { storeToLocal, getFromLocal } = useWebStorage();
    let [apiKey, setAPIKey] = useState(getFromLocal(SLATE_API_SECRET_KEY));
    let [slateData, setSlateData] = useState(null);
    //fetchFromSlate();

    useEffect(() => {
        console.log(slateData);
    }, [slateData]);


    //#region Helper Methods

    async function fetchFromSlate() {
        const response = await fetch('https://slate.host/api/v1/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // NOTE: your API key
                Authorization: 'Basic ' + apiKey,//'SLAa8bae4c4-c5f9-420b-ada5-a95af1a06abbTE',
            },
            body: JSON.stringify({
                data: {
                    // NOTE: optional, if you want your private slates too.
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
                <div>
                    Slate Integration
                </div>
                <Accordion>{
                    slateData?.slates?.map((x, i) => {
                        { console.log(x); }
                        return (
                            <AccordionSection key={i} label={x.slatename}>
                                Bro Song
                            </AccordionSection>
                        );
                    })
                }</Accordion>
                <div className="my-2">
                    <Button onClick={() => fetchFromSlate()}>
                        Fetch From Slate
                    </Button>
                </div>
                <div>
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