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

    /**
     * Fetches from aquarius and returns a promise to evaluate with the results
     * @param {The network for aquarius to query, ie 'mainnet', 'rinkeby'} network
     * @param {The text to filter the fetch results by} searchterm
     * @param {The page of the results to query, typically '1'} page
     */
    function fetchDataBySearchterm(network, searchterm, page) {
        return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + searchterm + '&page=' + page)
            .then(data => data.json());
    }

    /**
     * Fetches from aquarius and returns a promise to evaluate with the results
     * @param {The network for aquarius to query, ie 'mainnet', 'rinkeby'} network
     * @param {The text to filter the fetch results by} walletid
     */
    function fetchDataByWallet(network, walletid) {

    }

    return { fetchDataBySearchterm, fetchDataByWallet };
}

export { useWalletReady, useAquariusFetch };