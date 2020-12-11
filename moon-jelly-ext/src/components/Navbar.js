import React, { PureComponent } from 'react';
import Button from './Button.js';

export default class Navbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <header className={"container"}>
                <Button
                    primary={this.props.selected == "mint"}
                >
                    Publish
                </Button>
                <Button
                    primary={this.props.selected == "search"}
                >
                    Search
                </Button>

                <Button
                    primary={this.props.selected == "analyze"}
                >
                    Wallet
                </Button>
            </header>
        )
    }
}
