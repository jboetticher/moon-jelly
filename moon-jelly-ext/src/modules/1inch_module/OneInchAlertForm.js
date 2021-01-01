import React, { useState, useEffect } from 'react'
import Button from '../../components/Button.js';
import SelectSearch from 'react-select-search';
import './SelectSearch.css';

import { useWebStorage } from '../../functionality/WebStorageHooks.js';
import TokenSelectSearch from './TokenSelectSearch.js';

import './OneInchAlertForm.css';

let OneInchAlertForm = props => {

    // State holds a JSON representation of all the alert rows
    let [entries, setEntries] = useState([]);

    // Converts the state JSON into renderable JSX
    function renderAlertList() {
        let toRender = [];
        for (var i = 0; i < entries.length; i++) {
            let row = <AlertRow key={i} index={i} data={entries[i]} handleRemoveRow={handleRemoveRow} handleAmountChange={handleAmountChange}/>;
            toRender.push(row);
        }

        return toRender;
    }

    // Add New Trigger is pressed
    function handleAddRow(){
        const newAlertList = entries.concat({
            "setting": "above",
            "amount": 0,
            "token": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
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
    function handleAmountChange(index, amount){
        console.log("this index: " + index + " has amount of " + amount);

        // filter out the index we want to remove
        const newAlertList = entries.map((item, i) => {
            if(i == index) {
                const updatedItem = {
                    ...item,
                    "amount" : amount,
                };
                return updatedItem;
            }
            return item;
        });

        console.log("updated amount values", newAlertList);
        setEntries(newAlertList);
    }

    // token is changed in the token dropdown for a row
    function handleTokenChange(index, token){

    }

    // is above/below change for a row
    function handleSettingChange(index, setting){

    }

    return (
        <div>
            <div> Notify me when {props.datatokenSymbol} is </div>
            {renderAlertList()}
            <button
                onClick={() => {
                    handleAddRow();
                }}
            >
                Add New Trigger
            </button>
        </div>
    );
}

let AlertRow = props => {

    return (
        <div className="alertRow">
            <select id="setting" name="setting" className="alertSettingBox">
                <option value="above">above</option>
                <option value="below">below</option>
            </select>
            <input 
                className="alertAmountBox"
                value={props.data['amount']}
                onChange={(e) => {
                    const { name, value } = e.target;
                    props.handleAmountChange(props.index, value);
                }} 
            />
            <TokenSelectSearch
                className="select-search small-search"
                smallSearch={true}
                onChange={(value) => {
                    console.log("selected ", value);
                }}
            />
            <a
                style={{ cursor: "pointer" }}
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