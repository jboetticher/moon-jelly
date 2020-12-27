import React, { useState, useEffect } from 'react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';
import Switch from 'react-switch';

import MarketAssetList from '../MarketAssetList';
import '../../styles/Market.css';

import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'
import { useWebStorage } from '../../functionality/WebStorageHooks.js'
import { useOcean } from '@oceanprotocol/react';

/* Uses tag input field from https://betterstack.dev/projects/react-tag-input/ */
import ReactTagInput from "@pathofdev/react-tag-input";
import "../../styles/TagInput.css";

import "../../styles/Alerts.css";

let Alerts = props => {

    const network = useOcean()['config']['network'];
    const { storeToLocal, storeArrayToLocal, getArrayFromLocal, getFromLocal } = useWebStorage();
    const { fetchDDO } = useAquariusFetch();

    // retrieve keywords from localStorage
    // example keyword is only displayed if keywords does not exist in localStorage
    let storedKeywords = getArrayFromLocal("keywords_" + network) != null ? getArrayFromLocal("keywords_" + network) : ['example keyword'];

    const [tags, setTags] = React.useState(storedKeywords);

    // keeps track of state of checkbox (when this changes, checkbox visually updates)
    let [enabled, setEnabled] = useState(getFromLocal("keywordAlerts") == 'true' ? true : false);

    // updates in local storage
    useEffect(() => {
        storeToLocal("keywordAlerts", enabled);
        //console.log(props.name, getFromLocal(props.name));
    }, [enabled]);

    //#region Basically does the same thing in Bookmarks.js to get the bookmarks from storage and render them

    // Keeps track of fetched new asset data 
    let [assetResults, setAssetResults] = useState("");

    function getKeywordAssetsDDOs() {
        let assetDids = getArrayFromLocal("keywordAssets_" + network);

        // If it does not exist in storage, return
        if (assetDids == null) return;

        // Create an array of promises to evaluate
        let promiseArray = [];
        assetDids.forEach((did) => {
            promiseArray.push(fetchDDO(did));
        });

        // Once all promises are done, update assetResults with the data
        Promise.all(promiseArray).then((values) => {
            console.log(values);
            setAssetResults({ results: values });
        });
    }

    function renderKeywordAssets() {
        // if asset results is empty, fetch it
        if (assetResults == "") {
            getKeywordAssetsDDOs();
            console.log("rendering keyword assets");
        }
        return (
            assetResults != "" ? <MarketAssetList results={assetResults} showDismiss={true}> </MarketAssetList> : null
        );
    }

    /* -------- */
    //#endregion

    return (
        <Panel>
            <div> Track new data assets on the market with keywords. </div>
            <div className="gradient-border-wrap mt-1">
                <ReactTagInput
                    tags={tags}
                    placeholder="Enter a keyword or phrase"
                    onChange={(newTags) => {
                        // update tags
                        setTags(newTags);

                        // save keywords to localStorage
                        storeArrayToLocal("keywords_" + network, newTags);

                        // save current date to localStorage
                        storeToLocal("keywordDate_" + network, new Date().toISOString());
                    }}
                />
            </div>
            <div className="notify-bar mt-1">
                <div> Send me notifications </div>
                <Switch
                    className="react-switch mr-1 v-center"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onChange={(checked, e, id) => {
                        console.log("check change ", checked);
                        setEnabled(checked);
                    }}
                    checked={enabled}
                    onColor=
                    "#ff4092"
                />
            </div>
            {renderKeywordAssets()}
        </Panel>
    );
}

export default Alerts;
export { Alerts };