// slate integration
import React from 'react';
import Panel from '../../components/Panel.js';
import BalancerPool from './BalancerPool.js';

const MODULE_NAME = "balancer_ui_module";

const balancer_module = () => (
    <Panel>
        <BalancerPool />
    </Panel>
);

export default {
    title: "Ocean Pools", // (string) name to display in menus. If left blank, defaults to name
    name: MODULE_NAME, // (string) key of the module
    properties: { // container of various properties for code to reference
        hasPanel: true // (boolean) whether or not the module has a panel to display
    },
    panel: balancer_module, // (function) react function to display as a panel
    //onAppStart: onAppStart // (function) function that gets called when the app starts
}