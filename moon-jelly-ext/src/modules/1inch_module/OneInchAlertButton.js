import React, { useState } from 'react'
import { useWebStorage } from '../../functionality/WebStorageHooks.js';

let OneInchAlertButton = props => {

    const { storeArrayToLocal, getArrayFromLocal } = useWebStorage(); 

    // Enabled = false => trigger is not set
    // Enabled = true => trigger is set
    let [enabled, setEnabled] = useState(isEnabledInStorage());

    // Determines the initial state of the button (open menu or no menu)
    function isEnabledInStorage(){
        let oneInchAlertList = getArrayFromLocal("oneInchAlertList");
        if(oneInchAlertList == null) {
            return false;
        }
        else {
            // If did is in the array, return true
            return oneInchAlertList.indexOf(props.did) >= 0 ? true : false;
        }  
    }

    // Flips state when pressed
    function handleTrigger() {

        // grab the array from localStorage
        // Does not need mainnet/rinkeby distinct since 1inch is only on the mainnet
        // Market assets however can be either mainnet or rinkeby for testing (only looks at price of an asset)
        let oneInchAlertList = getArrayFromLocal("oneInchAlertList");

        // Button displays "Remove Alert Trigger"
        // Click disables trigger
        if (enabled) { 
            setEnabled(false);
            
            // Remove did from array
            oneInchAlertList.splice(oneInchAlertList.indexOf(props.did), 1);

            // Update localStorage
            storeArrayToLocal("oneInchAlertList", oneInchAlertList);
        }

        // Button displays "Set Alert Trigger"
        // Click enables trigger
        else { 
            setEnabled(true);

            let entry = {
                "did": props.did,
                "token": props.token,
                "trigVal": 5
            }

            // Add did to array
            oneInchAlertList.push(entry);

            // Update localStorage
            storeArrayToLocal("oneInchAlertList", oneInchAlertList);
        }
    }

    function renderAlertOptions(){

        return(
            <div className="alertOptions">
                <div>
                    Notify me when
                </div>
                <div>
                    {props.datatokenSymbol}
                </div>
                <div>
                    is above/below
                </div>
                <input
                    placeholder="amount"
                >
                </input>
                <div>
                    {props.token}
                </div>       
            </div>
        );

    }

    return (
        <div>
            <a
                onClick={handleTrigger}
                style={{ cursor: "pointer" }}
            >
                {enabled ? 'Remove Alert Trigger' : 'Set Alert Trigger'}
            </a>
            {enabled ? renderAlertOptions() : null}
        </div>
    );
}

export default OneInchAlertButton;
export { OneInchAlertButton };
