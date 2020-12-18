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

    
    // returns a Promise
    async function getJsonData() {
        try {
            let data = await fetch('https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + searchterms);
            let jsonData = await data.json();
            return jsonData;   
        }
        catch(error) {
            console.log(error);
            return null;
        }
         
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
                        getJsonData().then(jsonData => console.log(jsonData));
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