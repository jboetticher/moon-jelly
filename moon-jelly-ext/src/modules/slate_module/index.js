// slate integration
import React from 'react';
import SlateFetch from './SlateFetch.js';
import Panel from '../../components/Panel.js';
import useWebStorage from '../../functionality/WebStorageHooks.js';

const slate_module = () => (
    <Panel>
        <SlateFetch />
    </Panel>
);

function slateOnAppStart() {
    let val = localStorage.getItem("slateToOcean");
    if(val != null && val !== "")
    {
        console.log("slateToOcean value: ", val);

        

        localStorage.setItem("slateToOcean", "");
    }
}



export default {
    title: "Slate",
    name: 'slate_module',
    properties: {
        hasPanel: true
    },
    panel: slate_module,
    onAppStart: slateOnAppStart
}