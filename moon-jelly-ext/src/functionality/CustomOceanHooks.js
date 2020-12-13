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

export { useWalletReady };