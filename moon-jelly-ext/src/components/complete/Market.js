import React, { useState, useEffect } from 'react';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { usePublish, usePricing } from '@oceanprotocol/react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';
import Label from '../Label.js';
import ConnectPanel from '../ConnectPanel.js';
import Correct from '../Correct.js';

import '../../styles/Market.css';

let Market = props => {

    const request = new Request("https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?=");
    const request2 = new Request("https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=test");


    // returns a Promise
    async function getJsonData() {
        try {
            let data = await fetch('https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + searchTerms);
            let jsonData = await data.json();
            return jsonData;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    // creates an array of divs from the search results
    function renderResults() {
        let resultEntries = [];

        // for a single page (default 1)
        if(searchResults == "") return;
        for(var i=0;i<searchResults['results'].length;i++){
            let name = searchResults['results'][i]['service'][0]['attributes']['main']['name'];
            //let desc = entry['service'][0]['attributes']['additionalInformation']['desc'];

            let resultEntry =
                <div classname="entry" key={i}>
                    Name: {name}
                    {/*desc*/}
                </div>;
            
            resultEntries.push(resultEntry);
        }

        return resultEntries;
    }


    let [searchTerms, setSearchTerms] = useState("");

    let [searchResults, setSearchResults] = useState("");

    return (
        <Panel>
            <form className={"form searchForm"}>

                <Input
                    type="text"
                    name="tokenSearch"
                    placeholder={searchTerms ? searchTerms : "Search for Data Tokens."}
                    value={searchTerms}
                    //help="Search for a dataset."
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSearchTerms(value);
                    }}
                />
                <Button
                    type="button"
                    id="tokenSearchButton"
                    onClick={() => {
                        getJsonData().then(jsonData => {
                            console.log(jsonData);
                            setSearchResults(jsonData);
                        });
                    }}
                >
                    Search
                </Button>
                
            </form>
            <div>
                {renderResults()}
            </div>
        </Panel>
    );
}

export default Market;
export { Market };