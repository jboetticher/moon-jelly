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
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import Button from './components/Button'
import Header from './components/Header';
import Label from './components/Label';

// Complete Panels
import Wallet from './components/complete/Wallet';
import Mint from './components/complete/Mint';
import ModuleMenu from './components/complete/ModuleMenu';
import Market from './components/complete/Market';

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

console.log(oceanConfig);



export const PanelContext = React.createContext();

//#endregion

//#region On Application Open

const modulesObject = modules;

// Loop through all the modules to fire their onAppStart functions
for (var i = 0; i < modulesObject.length; i++) {
    if(modulesObject[i].onAppStart != null)
    {
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
    if (oceanSearchCheck !== "" && oceanSearchCheck !== null && oceanSearchCheck !== undefined) {
        goToPage("market", () => {
            // here you would go to the search page via hook and slap it in
            insertSearchTerm(oceanSearchCheck);
        });

        // makes sure it doesn't send again
        storeToLocal("searchOnOcean", "");
        oceanSearchCheckSet("");
    }

    console.log(useOcean());
    let { ocean, accountId, connect, refreshBalance, status } = useOcean();

    let [oceanConnected, setOceanConnected] = useState(status > 0);
    useEffect(() => {
        setOceanConnected(status > 0);
    }, [status]);

    let walletConnectionNotice = oceanConnected ? <div></div> :
        <div className={"mt-2"}>
            <Label className={"defaultLabel"}>
                Connect your wallet to start.
            </Label>
            <Button
                primary padding
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

