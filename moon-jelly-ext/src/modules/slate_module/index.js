// slate integration

import React from 'react';
import SlateFetch from './SlateFetch.js';
import Panel from '../../components/Panel.js';

const slate_module = () => (
    <Panel>
        <SlateFetch />
    </Panel>
);

export default {
    title: "Slate",
    name: 'slate_module',
    properties: {
        hasPanel: true
    },
    panel: slate_module
}