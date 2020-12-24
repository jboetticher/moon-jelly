import React, { useState, useEffect } from 'react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';

import MarketAssetList from '../MarketAssetList';
import '../../styles/Market.css';

import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'

let Bookmarks = props => {

    
    return(
        <Panel>
            <div> hello i am bookmarks</div>
        
        </Panel>
    );
}

export default Bookmarks;
export { Bookmarks };