import React, { useState, useEffect } from 'react'
import Button from '../../components/Button.js';
import SelectSearch from 'react-select-search';
import './SelectSearch.css';

import { useWebStorage } from '../../functionality/WebStorageHooks.js';
import TokenSelectSearch from './TokenSelectSearch.js';
import Tokens from './assets/tokens.json';

import './OneInchAlertForm.css';

let OneInchAlertForm = props => {

    const { storeArrayToLocal, getArrayFromLocal } = useWebStorage();

    // State holds a JSON representation of all the alert rows
    let [entries, setEntries] = useState(getEntriesArrayFromStorage());

    useEffect(() => {
        // store alert JSON to storage
        handleStorage();

        // Update OneInchAsset counter
        props.setNumAlerts(getEntriesArrayFromStorage().length);

        // Send message to background script
        // Only works when running as extension (npm run build)
        //chrome.runtime.sendMessage({name: "storageUpdate"});

    }, [entries]);

    // Converts the state JSON into renderable JSX
    function renderAlertList() {
        let toRender = [];
        for (var i = 0; i < entries.length; i++) {
            let row = <AlertRow key={i} index={i} data={entries[i]}
                handleRemoveRow={handleRemoveRow}
                handleAmountChange={handleAmountChange}
                handleSelectChange={handleSelectChange}
                handleTokenChange={handleTokenChange}
            />;
            toRender.push(row);
        }

        return toRender;
    }

    // Add New Trigger is pressed
    function handleAddRow() {
        const newAlertList = entries.concat({
            "selection": "above",
            "amount": 0,
            "token": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "tokenSymbol": "ETH"
        });
        console.log("added row to ", newAlertList);

        setEntries(newAlertList);
    }

    // x on a trigger row is pressed
    function handleRemoveRow(index) {
        console.log("oh yeha lets remove", index);

        // filter out the index we want to remove
        const newAlertList = entries.filter((item, i) => i !== index);

        console.log("removed row", newAlertList);
        setEntries(newAlertList);
    }

    // value changes in the amount box for a row
    function handleAmountChange(index, amount) {
        console.log("this index: " + index + " has amount of " + amount);

        // filter out the index we want to remove
        const newAlertList = entries.map((item, i) => {
            if (i == index) {
                const updatedItem = {
                    ...item,
                    "amount": amount,
                };
                return updatedItem;
            }
            return item;
        });

        console.log("updated amount values", newAlertList);
        setEntries(newAlertList);
    }

    // token is changed in the token dropdown for a row
    function handleTokenChange(index, tokenAddress) {
        console.log("this index: " + index + " has token " + tokenAddress);

        // filter out the index we want to remove
        const newAlertList = entries.map((item, i) => {
            if (i == index) {
                const updatedItem = {
                    ...item,
                    "token": tokenAddress,
                    "tokenSymbol": Tokens['tokens'][tokenAddress]['symbol']
                };
                return updatedItem;
            }
            return item;
        });

        console.log("updated token ", newAlertList);
        setEntries(newAlertList);

    }

    // is above/below change for a row
    function handleSelectChange(index, selection) {
        console.log("this index: " + index + " has selected " + selection);

        // filter out the index we want to remove
        const newAlertList = entries.map((item, i) => {
            if (i == index) {
                const updatedItem = {
                    ...item,
                    "selection": selection,
                };
                return updatedItem;
            }
            return item;
        });

        console.log("updated selection values", newAlertList);
        setEntries(newAlertList);
    }

    // Stores JSON representation of alert/trigger list
    // This could probably be more efficient, but it works
    function handleStorage() {

        // Get the array from local storage
        let storedList = getArrayFromLocal("oneInchAlertList");

        // Find the associated entry in the array
        let storedEntry = storedList.find(item => {
            return item.did == props.did;
        });

        // Entry does not exist
        if (storedEntry == null) {

            // Add entry to array
            storedList.push(
                {
                    "did": props.did,
                    "assetName": props.assetName,
                    "datatokenSymbol": props.datatokenSymbol,
                    "entries": entries
                }
            );

            // Store the modified array
            storeArrayToLocal("oneInchAlertList", storedList);
        }

        // Entry exists
        else {
            // Remove the old entry from the array
            storedList.splice(storedList.indexOf(storedEntry), 1);

            // Insert the updated entry
            storedList.push(
                {
                    "did": props.did,
                    "assetName": props.assetName,
                    "datatokenSymbol": props.datatokenSymbol,
                    "entries": entries
                }
            );

            // Store the modified array
            storeArrayToLocal("oneInchAlertList", storedList);
        }


    }

    // Gets the associated entries array from storage
    // Returns empty array if it is not in storage
    // Returns the array if in storage
    function getEntriesArrayFromStorage() {
        // Get the array from local storage
        let storedList = getArrayFromLocal("oneInchAlertList");

        // Find the associated entry in the array
        let storedEntry = storedList.find(item => {
            return item.did == props.did;
        });

        if (storedEntry == null) {
            return [];
        }
        else {
            // Have to parse before returning to make it an array object
            return storedEntry.entries;
        }
    }

    return (
        <div>
            <div> Notify me when {props.datatokenSymbol} is </div>
            {renderAlertList()}
            <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                    handleAddRow();
                }}
            >
                Add New Trigger
            </a>
        </div>
    );
}

let AlertRow = props => {

    return (
        <div className="alertRow">
            <select
                id="setting"
                name="setting"
                className="alertSettingBox"
                value={props.data['selection']}
                onChange={(e) => {
                    const { name, value } = e.target;
                    props.handleSelectChange(props.index, value);
                }}
            >
                <option value="above">above</option>
                <option value="below">below</option>
            </select>
            <input
                className="alertAmountBox"
                value={props.data['amount']}
                onChange={(e) => {
                    // only allows numbers and decimals
                    var reg = new RegExp(/^\d*\.?\d*$/); 
                    if(reg.test(e.target.value)){
                        props.handleAmountChange(props.index, e.target.value);
                    }
                }}
            />
            <TokenSelectSearch
                className="select-search small-search"
                smallSearch={true}
                value={props.data['token']}
                onChange={(value) => {
                    console.log("selected ", value);
                    props.handleTokenChange(props.index, value);
                }}
            />
            <a
                style={{ cursor: "pointer", textAlign: "center", lineHeight: "25px" }}
                onClick={() => {
                    console.log("my index is:", props.index);
                    props.handleRemoveRow(props.index);
                }}
            >
                X
            </a>
        </div>
    );
}

export default OneInchAlertForm;
export { OneInchAlertForm };