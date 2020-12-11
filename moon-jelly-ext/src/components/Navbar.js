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
                    primary={this.props.selected == "mint"}
                >
                    Mint
                </Button>
                <Button
                    primary={this.props.selected == "analyze"}
                >
                    Analyze
                </Button>
                <Button
                    primary={this.props.selected == "wallet"}
                >
                    Wallet
                </Button>
                <Button
                    primary={this.props.selected == "more"}
                >
                    More
                </Button>
            </header>
        )
    }
}
