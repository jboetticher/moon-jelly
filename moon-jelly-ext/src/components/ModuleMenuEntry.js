import React, { Component, useState, useContext } from 'react'
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

    // called when checkbox is clicked
    // flips the enabled state value
    // flips the value stored in localStorage
    function onCheckChange(){
        storeToLocal(props.name, !enabled);
        setEnabled(!enabled);
    }

    return (
        <div>
            <input type="checkbox" checked={enabled} 
                onChange={() => onCheckChange()} />

            <Button
                primary={props.selected == props.name} noRound
                onClick={() => setNextPanel(props.name)}
            >
                {props.name}
            </Button>
        </div>
    );
}

export default ModuleMenuEntry

/*
export default class ModuleMenuEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: false
        }
    }

    //let { useStoreToLocal, useGetFromLocal } = useWebStorage();

    // Check if we can use web storage in the browser
    storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }



    // Flips the state of the checkbox whenever it is clicked
    // Stores new value in localstorage
    changeStoredState() {

        // Change component state off of the stored state
        let prevState = this.getStoredState();
        this.setState({
            enabled: !prevState
        });

        // Store changed state in localstorage
        if (this.storageAvailable('localStorage')) {
            localStorage.setItem(this.props.name, !prevState);
            //console.log("stored", localStorage.getItem(this.props.name));
        }
    }

    // Grabs the state of the checkbox from localStorage
    getStoredState() {
        if (this.storageAvailable('localStorage')) {
            //console.log("retrieved", localStorage.getItem(this.props.name));

            // Stored as string, but we need a boolean value
            let val = localStorage.getItem(this.props.name) == 'true' ? true : false;

            return val;
        }
        else {
            // if localstorage is unavailable, use component state
            return this.state.enabled;
        }
        
    }


    render() {
        return (
            <div>
                <input type="checkbox" checked={this.getStoredState()} onChange={() => this.changeStoredState()} />

                <Button
                    primary={this.props.selected == this.props.name} noRound
                    onClick={this.props.setNextPanel.bind(this, this.props.name)}
                >
                    {this.props.name}
                </Button>
            </div>
        );
    }
}
*/