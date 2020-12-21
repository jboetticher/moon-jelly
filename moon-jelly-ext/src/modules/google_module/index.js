// google integration

import React from 'react';

const google_module = () => (
    <div>Google Drive Module</div>
);

export default {
    name: 'google_module',
    title: "Google Drive",
    properties: {
        hasPanel: true
    },
    panel: google_module
}