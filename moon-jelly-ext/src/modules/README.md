# Modules
The modules feature of Moon Jelly allows for the development of additonal features and integrations. The Slate module, for instance, streamlines the process of publishing a Slate-hosted file directly onto the Ocean Market. Users can utilize the module from within the extension itself, as well as within their Slate account. Slate is a Filecoin-based decentralized file hosting service (see https://slate.host/ for details on Slate and Filecoin).

## Quick Start
For a working example of a module, see the slate module.  

Modules are contained within their own folder under `src/modules/`. For example, `src/modules/my_module`.  

Each module contains an index.js file, written in React. An example of the structure is detailed below:

### src/modules/my_module
```JSX
import React from 'react';
import Panel from '../../components/Panel.js'; // Required import to use panel

const MODULE_NAME = "my_module";

// The display of the module is wrapped in a panel
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
We recommend that you create and import other components into your module's index.js file, rather than putting everything in just the index.js of your module. The folder/file system of your module can be structured however you prefer, as Moon Jelly only requires that the index.js be formatted similarly to the code above.     

Currently, modules need to be listed within "src/modules/index.js" in order to be imported into the extension. While this system works, a more autopated system can be created in the future.

### src/modules/index.js
```JSX
// Modules are imported from their respective folders
import slate_module from './slate_module';
import my_module from './my_module'

// Module are listed within the export. Add yours to the array 
export default [
    slate_module,
    my_module,
];
```
Once `src/modules/index.js` is updated and `src/modules/my_module/index.js` is created, your module will be availiable to be used in the Modules menu of the Moon Jelly extension.

### Modules in the public folder
There may also be a time where you have to add scripts to the background or the content scripts. To do so, you will have to edit the manifest. While we would like an automated system that generates a manifest automatically in the future, this is the current system.
When adding scripts to the manifest, you should store them in a new folder in the `public/modules/` folder.
