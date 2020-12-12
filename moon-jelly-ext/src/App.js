import React, { Component } from 'react';

// Functionality
import { ConfigHelper } from '@oceanprotocol/lib';
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as PanelManager from './functionality/PanelManager.js';

// Assets
import Jellyfish from './assets/ocean-jelly-placeholder.svg';

// Components
import { OceanProvider, useOcean } from '@oceanprotocol/react';
import Navbar from './components/Navbar';
import Panel from './components/Panel';
//import PublishForm from './components/PublishForm'
//import Search from './components/Search'
import DataWallet from './components/DataWallet';
import Header from './components/Header';
import Label from './components/Label';

import ModuleMenu from './components/ModuleMenu';
//import Footer from './components/Footer'
//import Button from './components/Button'
import './styles/global.css';
import './styles/App.css';

//let [network, infuraId] = ['mainnet', "92722306e5f042e6af0e80e253125972"];
let [network, infuraId] = ['rinkeby', "92722306e5f042e6af0e80e253125972"];


// Creates the wallet connect provider (necessary for ocean)
const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: infuraId
        }
    }
};

// Creates the options
const web3ModalOpts = {
    network: network, // which network to use
    cacheProvider: true, // optional
    providerOptions // required
};

// the default configuration, can be dynamic later.
const oceanDefaultConfig = new ConfigHelper().getConfig(
    network, // which network to use
    infuraId // infura id
);

const oceanConfig = {
    ...oceanDefaultConfig,
    metadataCacheUri: 'https://aquarius.' + network +'.oceanprotocol.com/',
    providerUri: 'https://provider.' + network +'.oceanprotocol.com/'
};

console.log(oceanConfig);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { nextToDisplay: '' };
    }

    /**
     * 
     * @param {the id of the display to show} nextToDisplay 
     */
    chooseDisplay(nextToDisplay) {
        if (PanelManager.HasPanel(nextToDisplay)) {
            return PanelManager.GetPanel(nextToDisplay);
        }
        else {
            switch (nextToDisplay) {
                case 'mint':
                    return <Panel>mint<MyTestOceanComponent /></Panel>;
                case 'analyze':
                    return <Panel>analyze</Panel>;
                case 'wallet':
                    return <DataWallet />;
                case 'more':
                    return <Panel><ModuleMenu selected={this.state.nextToDisplay} setNextPanel={this.setNextPanel.bind(this)} /></Panel>;
                case 'home':
                    return <HomePanel />
                default:
                    return <HomePanel />
            }
        }
    }

    /**
     * Sets the id of the next panel.
     * @param {"id of the panel to change to"} nextPanel 
     */
    setNextPanel(nextPanel) {
        this.setState({ nextToDisplay: nextPanel });
    }

    render() {
        return (
            <OceanProvider initialConfig={oceanConfig} web3ModalOpts={web3ModalOpts}>
                <div className={"app"}>
                    <Header nextDisplay={this.setNextPanel.bind(this)} />

                    <div className={"container"}>
                        <div className={"navbar"}>
                            <Navbar selected={this.state.nextToDisplay} setNextPanel={this.setNextPanel.bind(this)} />
                            {/*<Navbar  nextDisplay={this.setNextDisplay.bind(this)} />*/}
                        </div>
                        <div className={"content"}>
                            {this.chooseDisplay(this.state.nextToDisplay)}
                        </div>
                    </div>
                    {/*<Footer />*/}
                </div>
            </OceanProvider>
        )
    }
}

let MyTestOceanComponent = props => {
    const { ocean, accountId } = useOcean();

    console.log("ocean", ocean);
    console.log("accountId", accountId);

    // it's all undefined!
    console.log(useOcean());

    return (
        <ul>
            <li>Ocean available: {`${Boolean(ocean)}`}</li>
            <li>Account: {accountId}</li>
        </ul>
    )
}

const HomePanel = (props) => {
    return (
        <Panel>
            <div className={"jellyfish"}>
                {/*<Jellyfish />*/}
                <img src={Jellyfish} />
            </div>
            <br />
            <Label className={"defaultLabel"}>
                Welcome to MoonJelly.
            </Label>
        </Panel>
    )
}


export default App

