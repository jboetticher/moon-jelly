import React from 'react';
import { OceanPool } from '@oceanprotocol/lib/dist/node/balancer/OceanPool';
import { useOcean } from '@oceanprotocol/react';

let BalancerPool = props => {

    let ocean = useOcean();
    console.log(ocean);
    let pool = new OceanPool(ocean.web3, null, null, null, null, '0xB602b33f5b207984B2ac9cCb378ddEe78B4D29da');
    console.log(pool);

    return(
        <div>
            Balancer Pool uwu
        </div>
    );
}

export default BalancerPool;