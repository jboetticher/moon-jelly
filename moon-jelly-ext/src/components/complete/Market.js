import React, { useState, useEffect } from 'react';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { usePublish, usePricing } from '@oceanprotocol/react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';
import Label from '../Label.js';
import ConnectPanel from '../ConnectPanel.js';
import Correct from '../Correct.js';

let Market = props => {

    const request = new Request("https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?=");
    const request2 = new Request("https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=test");

    // may or may not be funny code but it works so
    let requestAsJson = "";

    async function getJsonData() {

        /*fetch(request2)
            .then(response => response.json())
            .then(data => jsonData = data);*/

        let data = await fetch(request2);
        let jsonData = await data.json();

        return jsonData;    
    }


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
                        setSearchterms(value);
                    }}
                />
                <Button
                    type="button"
                    onClick={() => {
                        console.log(getJsonData());
                    }}
                >
                    Search
                </Button>
            </form>
        </Panel>
    );
}

export default Market;
export { Market };