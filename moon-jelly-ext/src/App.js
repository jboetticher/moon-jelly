import React, { Component } from 'react';

// Functionality
import './functionality/PanelManager.js';

// Assets
import Jellyfish from './assets/ocean-jelly-placeholder.svg';

// Components
import Navbar from './components/Navbar';
import Panel from './components/Panel';
//import PublishForm from './components/PublishForm'
//import Search from './components/Search'
//import DataWallet from './components/DataWallet'
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
        
        if(HasPanel(nextToDisplay)) {
            return GetPanel("shit");
        }

        switch (nextToDisplay) {
            case 'mint':
                console.log("Will display mint now")
                return <PublishForm />
            case 'analyze':
                console.log("Will display analyze now")
                return <Search />
            case 'wallet':
                console.log("Will display wallet now")
                return <DataWallet />
            case 'home':
                console.log("Will display home now")
                return <JellyFishLogo />
            default:
                return <JellyFishLogo />
        }
    }

    /**
     * Sets the id of the next panel.
     * @param {"id of the panel to change to"} nextPanel 
     */
    setNextPanel(nextPanel) {
        switch (nextPanel) {
            case 'mint':
                if (this.state.nextToDisplay != 'publish') {
                    this.setState({ nextToDisplay: 'publish' })
                }
                break;
            case 'wallet':
                if (this.state.nextToDisplay != 'wallet') {
                    this.setState({ nextToDisplay: 'wallet' })
                }
                break;
            case 'analyze':
                if (this.state.nextToDisplay != 'analyze') {
                    this.setState({ nextToDisplay: 'analyze' })
                }
                break;
            case 'home':
                if (this.state.nextToDisplay != 'home') {
                    this.setState({ nextToDisplay: 'home' })
                }
                break;
            default:
                if (this.state.nextToDisplay != 'home') {
                    this.setState({ nextToDisplay: 'home' })
                }
                break;
        }
    }

    render() {
        return (
            <div className={"app"}>
                <Header nextDisplay={this.setNextPanel.bind(this)} />

                <div className={"container"}>
                    <div className={"navbar"}>
                        <Navbar nextDisplay={this.setNextPanel.bind(this)} />
                        {/*<Navbar selected={this.state.nextToDisplay} nextDisplay={this.setNextDisplay.bind(this)} />*/}
                    </div>
                    <div className={"content"}>
                        {/*this.chooseDisplay(this.state.nextToDisplay)*/}
                        <JellyFishLogo />
                    </div>
                </div>

                {/*<Footer />*/}
            </div>
        )
    }
}


const JellyFishLogo = (props) => {
    return (
        <div className={"defaultLabel"}>
            <div className={"jellyfish"}>
                {/*<Jellyfish />*/}
                <img src={Jellyfish} />
            </div>
            <br />
            <Label className={"defaultLabel"}>
                Welcome to MoonJelly.
            </Label>
        </div>
    )
}


export default App

