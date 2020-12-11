import React, { Component } from 'react';

// Functionality
import * as PanelManager from './functionality/PanelManager.js';

// Assets
import Jellyfish from './assets/ocean-jelly-placeholder.svg';

// Components
import Navbar from './components/Navbar';
import Panel from './components/Panel';
//import PublishForm from './components/PublishForm'
//import Search from './components/Search'
import DataWallet from './components/DataWallet';
import Header from './components/Header';
import Label from './components/Label';
//import Footer from './components/Footer'
//import Button from './components/Button'
import './styles/global.css';
import './styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { nextToDisplay: '' }
    }

    // on startup add the core default panels like mint & search

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
                    console.log("Will display mint now");
                    return <Panel>mint</Panel>;
                case 'analyze':
                    console.log("Will display analyze now");
                    return <Panel>analyze</Panel>;
                case 'wallet':
                    console.log("Will display wallet now");
                    return <Panel><DataWallet /></Panel>;
                case 'home':
                    console.log("Will display home now");
                    return <JellyFishLogo />
                default:
                    console.log("Will display home now");
                    return <JellyFishLogo />
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
        )
    }
}


const JellyFishLogo = (props) => {
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

