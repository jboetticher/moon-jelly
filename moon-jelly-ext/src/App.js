import logo from './assets/settings.svg';
import './App.css';
import React, { Component } from 'react'
import { ReactComponent as Jellyfish } from '@oceanprotocol/art/jellyfish/jellyfish-full.svg'

//import Navbar from './components/Navbar'
//import PublishForm from './components/PublishForm'
//import Search from './components/Search'
//import DataWallet from './components/DataWallet'
//import Header from './components/Header'
//import Label from './components/Form/Label'
//import Footer from './components/Footer'
//import Button from './components/Button'

import './styles/global.css'
import styles from './styles/App.module.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { nextToDisplay: '' }
    }

    /*
    chooseDisplay(nextToDisplay) {
        switch (nextToDisplay) {
            case 'publish':
                console.log("Will display Publish now")
                return <PublishForm />
            case 'search':
                console.log("Will display Publish now")
                return <Search />
            case 'wallet':
                console.log("Will display Publish now")
                return <DataWallet />
            case 'home':
                console.log("Will display Publish now")
                return <JellyFishLogo />
            default:
                return <JellyFishLogo />
        }
    }

    setNextDisplay(nextDisplay) {
        switch (nextDisplay) {
            case 'publish':
                if (this.state.nextToDisplay != 'publish') {
                    this.setState({ nextToDisplay: 'publish' })
                }
                break;
            case 'search':
                if (this.state.nextToDisplay != 'search') {
                    this.setState({ nextToDisplay: 'search' })
                }
                break;
            case 'wallet':
                if (this.state.nextToDisplay != 'wallet') {
                    this.setState({ nextToDisplay: 'wallet' })
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

    */

    onComponentDidMount() {
        console.log("brugermy");
    }

    render() {
        return (
            <div className={"app"}>
                <div>cash money crypto</div>
                {
                    //<Header nextDisplay={this.setNextDisplay.bind(this)} />
                }

                <div className={"container"}>
                    <div className={"navbar"}>
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
        <div className={styles.defaultLabel}>
            <div className={styles.jellyfish}>
                <Jellyfish />
            </div>
            <br />
            <Label className={styles.defaultLabel}>
                Welcome to MoonJelly.
            </Label>
        </div>
    )
}


export default App

