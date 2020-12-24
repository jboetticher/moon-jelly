import React, { useEffect, useState, useContext } from 'react';

// components
import AccordionSection from '../../components/AccordionSection.js';
import ConnectPanel from '../../components/ConnectPanel.js';
import Accordion from '../../components/Accordion.js';
import Input from '../../components/Form/Input.js';
import Button from '../../components/Button.js';
import { PanelContext } from '../../App.js';

// hooks
import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { useWebStorage } from '../../functionality/WebStorageHooks.js';
import { useMintPage } from "../../functionality/MintPageHooks.js";

// assets
import SlateIcon from './assets/slateicon-32x32.png';
import Settings from './assets/settings.svg';

// styles
import '../../styles/ModuleMenu.css';
import './slate.css';

const SLATE_API_SECRET_KEY = "slate_api_key";

let SlateFetch = () => {
    const goToPage = useContext(PanelContext);
    const { storeToLocal, getFromLocal } = useWebStorage();
    const { insertAssetName, insertURL, insertAuthorName, insertDescription, insertMetaData } = useMintPage();

    let [apiKey, setAPIKey] = useState(getFromLocal(SLATE_API_SECRET_KEY));
    let [slateData, setSlateData] = useState(null);
    let [slateState, setSlateState] = useState(undefined);

    if (slateData === null) fetchFromSlate();

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

    //#region Check for Instructions

    let val = getFromLocal("slateToOcean");
    console.log("Slate to ocean value ", val);
    storeToLocal("slateToOcean");

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
        // first view shows
        let dataView = slateState === undefined ?
            <>
                <div className="mb-2">
                    <img src={SlateIcon} className={"mb-1"} />
                    Slates You Own
                </div>
                <Accordion className="mt-2">{
                    slateData?.slates?.map((x, i) => {
                        { console.log(x); }
                        return (
                            <AccordionSection key={i} label={x.slatename}>
                                <div className="assetBody">
                                    <div className="assetDesc mt-1">{x.data.body}</div>
                                    <div className="slate-button-container">
                                        <Button paddingx onClick={(e) => setSlateState(i)}>View Items</Button>
                                        <Button paddingx>Go to Slate</Button>
                                    </div>
                                </div>
                            </AccordionSection>
                        );
                    })
                }</Accordion>
            </>
            :
            <>
                <div className="mb-2">
                    <img src={SlateIcon} className={"mb-1"} />
                    {slateData?.slates[slateState].data.name}
                </div>
                {
                    slateData?.slates[slateState].data.objects.map((x, i) => {
                        return (
                            <div key={i} className={"module-menu-entry my-1"}>
                                <h6 className={"module-entry-title"} style={{ margin: "0px" }}>
                                    {x.name}
                                </h6>
                                <Button onClick={() => {
                                    // do mint stuff
                                    goToPage("mint", () => {
                                        insertMetaData(JSON.stringify({
                                            checksum: "", 
                                            contentLength: undefined,//x.size, 
                                            contentType: x.type, 
                                            encoding: "", 
                                            compression: "" 
                                        }));
                                        insertURL(x.url);
                                        insertAssetName(x.title);
                                        insertAuthorName(x.author);
                                        insertDescription(x.body);
                                    });
                                }}
                                    paddingx style={{ maxHeight: "35px" }}>
                                    Mint
                                </Button>
                                <div className={"mr-1"} />
                                <Button onClick={(e) => {
                                    window.open(x.url, "_blank");
                                }}
                                    paddingx style={{ maxHeight: "35px" }}>
                                    View
                                </Button>
                            </div>
                        );
                    })
                }
                <Button onClick={() => setSlateState(undefined)} paddingx>Return to Slate List</Button>
            </>;

        slateComponent =
            <div>
                {dataView}
                <img src={SlateIcon} className={"mb-1 mt-2"} />
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