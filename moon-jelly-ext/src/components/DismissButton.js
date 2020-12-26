import React, { useState } from 'react'

import { useOcean } from '@oceanprotocol/react'
import { useWebStorage } from '../functionality/WebStorageHooks.js';

let DismissButton = (props) => {

    const network = useOcean()['config']['network'];

    let [dismiss, setDismissed] = useState(props.dismiss);
    const { storeArrayToLocal, getArrayFromLocal } = useWebStorage();

    function handleDismiss() {

        // grab the array from localStorage
        let keywordAssets = getArrayFromLocal("keywordAssets_" + network); 

        // Button currently displays "Dismiss"
        if (dismiss) {
            setDismissed(false);
            // remove did from the keywordAssets_network array
            keywordAssets.splice(keywordAssets.indexOf(props.did), 1);
            storeArrayToLocal("keywordAssets_" + network, keywordAssets);
        }

        // Button currently displays "Undo"
        else {
            setDismissed(true);
            // add did to the keywordAssets_network array
            keywordAssets.push(props.did);
            storeArrayToLocal("keywordAssets_" + network, keywordAssets);
        }
    }

    return (
        <div>
            <a
                onClick={handleDismiss}
                style={{ cursor: "pointer" }}
            >
                {dismiss ? 'Dismiss' : 'Undo'}
            </a>
        </div>
    )
}

export default DismissButton;