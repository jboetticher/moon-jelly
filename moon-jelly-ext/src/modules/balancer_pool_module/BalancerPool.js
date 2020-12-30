import React from 'react';
import { Ocean } from '@oceanprotocol/lib';
import { OceanPool } from '@oceanprotocol/lib/dist/node/balancer/OceanPool';

let BalancerPool = props => {

    let pool = new OceanPool();
    console.log(pool);

    return(
        <div>
            Balancer Pool uwu
        </div>
    );
}

export default BalancerPool;