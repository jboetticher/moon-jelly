import React, { Component, useContext, useEffect, useState } from 'react';

// Functionality
import { ConfigHelper } from '@oceanprotocol/lib';
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as PanelManager from './functionality/PanelManager.js';
import { useWebStorage } from './functionality/WebStorageHooks.js';
import { useMarketPage } from './functionality/MarketPageHooks.js';
import modules from './modules';

// Assets
import Jellyfish from './assets/ocean-jelly-placeholder.svg';

// Components
import { OceanProvider, useOcean } from '@oceanprotocol/react';
import Navbar from './components/MainNavbar';
import Panel from './components/Panel';
import Button from './components/Button'
import Header from './components/Header';
import Label from './components/Label';

// Complete Panels
import Wallet from './components/complete/Wallet';
import Mint from './components/complete/Mint';
import ModuleMenu from './components/complete/ModuleMenu';
import Market from './components/complete/Market';
import Bookmarks from './components/complete/Bookmarks.js';
import Alerts from './components/complete/Alerts.js';

// Styling
import './styles/global.css';
import './styles/App.css';


//#region Provider Setups

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
    metadataCacheUri: 'https://aquarius.' + network + '.oceanprotocol.com/',
    providerUri: 'https://provider.' + network + '.oceanprotocol.com/'
};



export const PanelContext = React.createContext();

//#endregion

//#region On Application Open

const modulesObject = modules;

// Loop through all the modules to fire their onAppStart functions
for (var i = 0; i < modulesObject.length; i++) {
    if (modulesObject[i].onAppStart != null) {
        modulesObject[i].onAppStart();
    }
}

//#endregion



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
                    return <Mint />;
                case 'market':
                    return <Market />;
                case 'wallet':
                    return <Wallet />;
                case 'more':
                    return <Panel><ModuleMenu selected={this.state.nextToDisplay} setNextPanel={this.setNextPanel.bind(this)} /></Panel>;
                case 'home':
                    return <HomePanel />
                case 'bookmarks':
                    return <Bookmarks />
                case 'alerts':
                    return <Alerts />
                default:
                    return <HomePanel />
            }
        }
    }

    /**
     * Sets the id of the next panel.
     * @param {"id of the panel to change to"} nextPanel 
     */
    setNextPanel(nextPanel, response) {
        this.setState({ nextToDisplay: nextPanel }, response);
    }

    render() {
        return (
            <OceanProvider initialConfig={oceanConfig} web3ModalOpts={web3ModalOpts}>
                <PanelContext.Provider value={this.setNextPanel.bind(this)}>
                    <div className={"app"}>
                        <Header nextDisplay={this.setNextPanel.bind(this)} />

                        <div className={"container"}>
                            <div className={"navbar"}>
                                <Navbar selected={this.state.nextToDisplay} />
                            </div>
                            <div className={"content"}>
                                {this.chooseDisplay(this.state.nextToDisplay)}
                            </div>
                        </div>
                    </div>
                </PanelContext.Provider>
            </OceanProvider>
        )
    }
}

const HomePanel = (props) => {

    // Checks for search page
    let goToPage = useContext(PanelContext);
    let { insertSearchTerm } = useMarketPage();
    let { getFromLocal, storeToLocal } = useWebStorage();
    let [oceanSearchCheck, oceanSearchCheckSet] = useState(getFromLocal('searchOnOcean'));
    const nextPanel = getFromLocal("switch_panel");

    // Checks to see if there are instructions to go immediately to a certain panel.
    // This first if statement is a special check for the search panel. (spaghetti code)
    if (oceanSearchCheck !== "" && oceanSearchCheck !== null && oceanSearchCheck !== undefined) {
        goToPage("market", () => {
            // here you would go to the search page via hook and slap it in
            insertSearchTerm(oceanSearchCheck);
        });

        // makes sure it doesn't send again
        storeToLocal("searchOnOcean", "");
        oceanSearchCheckSet("");
    }
    else if (nextPanel !== "" && nextPanel !== null && nextPanel != undefined) {
        goToPage(nextPanel, () => {
            console.log("MoonJelly was instructed to immediately go to panel '" + nextPanel + "'.");
            storeToLocal("switch_panel", "");
        });
    }

    console.log(useOcean());
    let { connect, status, logout } = useOcean();
    let [oceanConnected, setOceanConnected] = useState(status > 0);
    useEffect(() => {
        setOceanConnected(status > 0);
    }, [status]);

    let walletConnectionNotice = oceanConnected ?
        <div className={"mt-2"}>
            <Label className={"defaultLabel"}>
                Reset your wallet connection here.
            </Label>
            <div className="mb-2" />
            <Button
                padding
                type="submit"
                onClick={() => {
                    console.log("Showing connect popup.");
                    storeToLocal("walletconnect", "");
                    logout().then(res => {
                        console.log("logout results", res);
                        return connect();
                    });
                }}
            >
                Connect to Wallet
            </Button>
        </div>
        :
        <div className={"mt-2"}>
            <Label className={"defaultLabel"}>
                Connect your wallet to start.
            </Label>
            <Button
                primary padding
                className="buttonPrimary p-1 mb-2 mt-1"
                type="submit"
                disabled={oceanConnected}
                onClick={() => {
                    console.log("Showing connect popup.");
                    connect();
                }}
            >
                Connect to Wallet
            </Button>
        </div>;

    return (
        <Panel>
            <Label className={"defaultLabel"}>
                Welcome to MoonJelly!
            </Label>
            <img className={"jellyfish"} src={Jellyfish} />
            <div className={"mt-1"}>
                {walletConnectionNotice}
            </div>
        </Panel>
    )
}



export default App

