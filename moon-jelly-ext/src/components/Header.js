import React, { PureComponent } from 'react';
import './../styles/Header.css';
import { ReactComponent as Logo } from '@oceanprotocol/art/logo/logo-white.svg';

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <header className={"appHeader"}>
                <Logo onClick={this.props.nextDisplay.bind(this, 'home')} />
                <h3 className={"topLinks"}>MoonJelly v0.1</h3>
            </header>
        )
    }
}
