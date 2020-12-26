import React, { Component, useEffect, useState } from 'react';
import { useOcean } from '@oceanprotocol/react';

function useWalletReady() {
    // Use this logic to determine whether or not the wallet has been connected.
    let { connect, status } = useOcean();
    let [oceanConnected, setOceanConnected] = useState(status > 0);

    useEffect(() => {
        setOceanConnected(status > 0);
    }, [status]);

    return { connect, walletConnected: oceanConnected };
}

function useAquariusFetch() {

    const network = useOcean()['config']['network'];

    /**
     * Fetches from aquarius and returns a promise to evaluate with the results
     * @param {The network for aquarius to query, ie 'mainnet', 'rinkeby'} network
     * @param {The text to filter the fetch results by} searchterm
     * @param {The page of the results to query, typically '1'} page
     */
    function fetchDataBySearchterm(/*network,*/ searchterm, page) {
        return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + searchterm + '&page=' + page)
            .then(data => data.json());
    }

    /**
     * Fetches from aquarius and returns a promise to evaluate with the results
     * @param {The network for aquarius to query, ie 'mainnet', 'rinkeby'} network
     * @param {The text to filter the fetch results by} walletid
     */
    function fetchDataByWallet(/*network,*/ walletid) {
        return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + walletid)
            .then(data => data.json());
    }

    /**
     * Fetches from aquarius and returns a promise to evaluate with the results
     * @param {The network for aquarius to query, ie 'mainnet', 'rinkeby'} network
     * @param {JSON object to filter results by} sortParams
     */
    function fetchDataBySort(/*network,*/ sortParams) {

        // An example of sortParams
        // see here for kind of more info on what you can pass https://github.com/oceanprotocol/market/blob/main/src/components/templates/Search/utils.ts
        /*let test = {
            "page": 2,
            "offset": 100,
            "query": {
                "nativeSearch": 1,
                "query_string": {
                    "query": "-isInPurgatory:true"
                }
            },
            "sort": { "dataToken": 1 },
            "text": "data"
        };*/

        return postData('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/query', sortParams);
    }

    /**
     * Fetches from metadata of did from aquarius and returns a promise to evaluate with the results
     * @param {The network for aquarius to query, ie 'mainnet', 'rinkeby'} network
     * @param {did of asset to get ddo of} did
     */
    function fetchDDO(/*network,*/ did){
        return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/' + did )
            .then(data => data.json());
    }

    // Example POST method implementation:
    // Straight from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    return { fetchDataBySearchterm, fetchDataByWallet, fetchDataBySort, fetchDDO };
}

export { useWalletReady, useAquariusFetch };