import React, { useState, useEffect } from 'react';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { usePublish, usePricing } from '@oceanprotocol/react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';
import Label from '../Label.js';
import ConnectPanel from '../ConnectPanel.js';
import Correct from '../Correct.js';

let Analyze = props => {

    const request = new Request("https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?=");
    fetch(request)
        .then(response => response.json())
        .then(response => console.log(response));

    let [searchterms, setSearchterms] = useState("");

    return (
        <Panel>
            <form className={"form"}>
                <Input
                    type="text"
                    name="tokenSearch"
                    placeholder={searchterms ? searchterms : "Search for Data Tokens."}
                    value={searchterms}
                    help="Search for a dataset."
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSearchterms(value)
                    }}
                />
            </form>
        </Panel>
    );
}

export default Analyze;
export { Analyze };