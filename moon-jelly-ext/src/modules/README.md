# Modules
The modules feature of Moon Jelly allows for the development of additonal features and integrations. The Slate module, for instance, streamlines the process of publishing a Slate-hosted file directly onto the Ocean Market. Users can utilize the module from within the extension itself, as well as within their Slate account. Slate a Filecoin-based decentralized file hosting service (see https://slate.host/ for details on Slate and Filecoin).

## Quick Start
A module will be contained with in it's own folder under src/modules/. For example, "src/modules/my_module".
A module contains an index.js file, written in React. An example of the structure is detailed below:

```JSX
import React, {useContext} from 'react';
import Panel from '../../components/Panel.js';

const MODULE_NAME = "my_module";

const my_module = () => (
    <Panel>
        <div> my cool module display </div>
    </Panel>
);

function myModuleOnAppStart() {
    // do something
}

export default {
    title: "My Module", // (string) name to display in menus. If left blank, defaults to name
    name: MODULE_NAME, // (string) key of the module
    properties: { // container of various properties for code to reference
        hasPanel: true // (boolean) whether or not the module has a panel to display
    },
    panel: my_module, // (function) react function to display as a panel
    onAppStart: myModuleOnAppStart // (function) function that gets called when the app starts
}
```
We recommend that you create and import files into your module's index.js file.
