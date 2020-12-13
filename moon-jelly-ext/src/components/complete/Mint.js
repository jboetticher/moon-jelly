import React, { PureComponent } from 'react';

import { useOcean } from '@oceanprotocol/react';

import Form from '../Form/Form.js';
import Panel from '../Panel.js';
import ConnectPanel from '../ConnectPanel.js';

let Mint = props => {

    const { ocean, accountId, connect } = useOcean();
    if (accountId === undefined) {
        console.log("Showing connect popup.");
        connect();
    }
    

    return (
        <Panel>
            <p>{accountId}</p>
            <Form>
            </Form>
        </Panel>
    );
}

export default Mint;