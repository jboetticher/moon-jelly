import React, { useState, useEffect } from 'react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';

import MarketAssetList from '../MarketAssetList';
import '../../styles/Market.css';

import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'
import { useBookmarks } from '../../functionality/BookmarkHooks.js';

let Alerts = props => {

    //box to display keywords
    //form to set keywords
    //function to fetch results given keyword
    //place to store fetched results
    //function to compare fetched results to stored results
    //system to re-query over time
    //function to display list of new results with what the keywords were

    return(
        <Panel>
            <div> Keyword Alerts </div>

        </Panel>
    );
}

export default Alerts;
export { Alerts };