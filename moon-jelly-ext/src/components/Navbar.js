import React, { PureComponent } from 'react';
import Button from './Button.js';
import "../styles/Navbar.css";

export default class Navbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <header className={"container navcontainer"}>
                <Button
                    primary={this.props.selected == "mint"} noRound
                    onClick={this.props.setNextPanel.bind(this, "mint")}
                >
                    Mint
                </Button>
                <Button
                    primary={this.props.selected == "analyze"} noRound
                    onClick={this.props.setNextPanel.bind(this, "analyze")}
                >
                    Analyze
                </Button>
                <Button
                    primary={this.props.selected == "wallet"} noRound
                    onClick={this.props.setNextPanel.bind(this, "wallet")}
                >
                    Wallet
                </Button>
                <Button
                    primary={this.props.selected == "more"} noRound
                    onClick={this.props.setNextPanel.bind(this, "more")}
                >
                    More
                </Button>
            </header>
        )
    }
}
