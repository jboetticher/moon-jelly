// slate integration

import React from 'react';

const slate_module = () => (
    <div>Slate Module</div>
);

export default {
    name: 'slate_module',
    properties: {
        hasPanel: true
    },
    panel: slate_module
}