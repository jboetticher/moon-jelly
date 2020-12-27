import React, { Component, useState, useContext, useEffect } from 'react'
import Switch from 'react-switch';
import Button from './Button.js';
import { useWebStorage } from '../functionality/WebStorageHooks.js'
import { PanelContext } from '../App.js';

/**
 * Stores the state of the checkbox as module_name, value in localStorage
 * ex. ['slate_module', 'false'] or ['google_module', 'true']
 */
let ModuleMenuEntry = props => {
    let { storeToLocal, getFromLocal } = useWebStorage();

    let setNextPanel = useContext(PanelContext);

    // keeps track of state of checkbox (when this changes, checkbox visually updates)
    let [enabled, setEnabled] = useState(getFromLocal(props.name) == 'true' ? true : false);

    // updates in local storage
    useEffect(() => {
        storeToLocal(props.name, enabled);
        console.log(props.name, getFromLocal(props.name));
    }, [enabled]);

    const viewButton = !enabled ? <></> :
        <div className={"mr-1"}>
            <Button
                primary={props.selected == props.name}
                onClick={() => setNextPanel(props.name)}
            >
                <div className="mx-2">
                    View
            </div>
            </Button>
        </div>;


    return (
        <div className="module-menu-entry mt-1">
            <div className={"module-entry-title mr-1 v-center"}>
                {props.title ? props.title : props.name}
            </div>
            {viewButton}
            <Switch
                className="react-switch mr-1 v-center"
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={(checked, e, id) =>  {
                    console.log("check change ", checked);
                    setEnabled(checked);
                }}
                checked={enabled}
                onColor="#ff4092"
            />
        </div>
    );
}

export default ModuleMenuEntry
