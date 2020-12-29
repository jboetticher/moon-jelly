import React, { useEffect, useState, useContext } from 'react';

// components
import AccordionSection from '../../components/AccordionSection.js';
import ConnectPanel from '../../components/ConnectPanel.js';
import Accordion from '../../components/Accordion.js';
import Input from '../../components/Form/Input.js';
import Correct from '../../components/Correct.js';
import Button from '../../components/Button.js';
import { PanelContext } from '../../App.js';

// hooks
import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { useForceUpdate } from "../../functionality/ForceRenderHook.js";
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

        // does check for external instructions
        function findObjectByTitle(title) {
            let objToReturn = null;

            json.slates.forEach(slate => {
                slate.data.objects.forEach(slateObject => {
                    if (slateObject.name === title) {
                        objToReturn = slateObject;
                    }
                });
            });

            console.log("object to return", objToReturn);
            return objToReturn;
        }

        let slateToOceanValue = getFromLocal("slateToOcean");
        console.log("Slate to ocean value (SlateFetch)", slateToOceanValue);
        if (slateToOceanValue !== "" && slateToOceanValue !== null && slateToOceanValue !== undefined) {
            console.log(json);
            // loops through the retrieved json to find the data that matches up with the slate
            const queriedSlateData = findObjectByTitle(slateToOceanValue);

            console.log("the right query", queriedSlateData);

            // once it finds the right data, it immediately goes to the mint page (see lines )
            if (queriedSlateData !== null) {
                exportToMintPage(
                    queriedSlateData.type,
                    queriedSlateData.url,
                    queriedSlateData.title,
                    queriedSlateData.author,
                    queriedSlateData.body
                );
            }

            // resets command
            storeToLocal("slateToOcean", "");
        }
    }

    function knowsSlateAPIKey() {
        const locAPIKEY = getFromLocal(SLATE_API_SECRET_KEY);
        return locAPIKEY !== null && locAPIKEY !== undefined && locAPIKEY !== '';
    }

    function exportToMintPage(type, url, title, author, body) {
        goToPage("mint", () => {
            insertMetaData(JSON.stringify({
                checksum: "",
                contentLength: undefined,//x.size, 
                contentType: type,
                encoding: "",
                compression: ""
            }));
            insertURL(url);
            insertAssetName(title);
            insertAuthorName(author);
            insertDescription(body);
        });
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
                    }}
                />
                <Button primary padding onClick={(e) => {
                    //e.preventDefault();
                    storeToLocal(SLATE_API_SECRET_KEY, apiKey);
                    storeToLocal("switch_panel", "slate_module");
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
                {
                    slateData?.slates == null ? <Correct /> :
                        <Accordion className="mt-2">{
                            slateData?.slates?.map((x, i) => {
                                { console.log(x); }
                                return (
                                    <AccordionSection key={i} label={x.slatename}>
                                        <div className="assetBody">
                                            <div className="assetDesc mt-1">{x.data.body}</div>
                                            <div className="slate-button-container">
                                                <Button paddingx onClick={(e) => setSlateState(i)}>View Items</Button>
                                                <Button paddingx onClick={(e) => window.open(x.data.url, '_blank')}>Go to Slate</Button>
                                            </div>
                                        </div>
                                    </AccordionSection>
                                );
                            })
                        }</Accordion>
                }
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
                                <h6 className={"module-entry-title"} style={{ margin: "0px", marginRight: "16px" }}>
                                    {x.name}
                                </h6>
                                <Button onClick={() => {
                                    exportToMintPage(x.type, x.url, x.title, x.author, x.body);
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