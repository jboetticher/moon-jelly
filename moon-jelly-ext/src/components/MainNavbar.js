import React, { useContext, PureComponent } from 'react';
import { PanelContext } from '../App.js';
import Button from './Button.js';
import "../styles/Navbar.css";

let Navbar = props => {

    let context = useContext(PanelContext);
    console.log(props.selected);
    return (
        <header className={"container navcontainer"} id={"main-navbar"}>
            <Button
                primary={props.selected == "mint"} noRound
                onClick={() => context("mint")}
            >
                Mint
            </Button>
            <Button
                primary={props.selected == "market" || props.selected == "bookmarks" || props.selected == "wallet" } noRound
                onClick={() => context("market")}
            >
                Market
            </Button>
            <Button
                primary={props.selected == "alerts"} noRound
                onClick={() => context("alerts")}
            >
                Alerts
            </Button>
            <Button
                primary={props.selected == "more"} noRound
                onClick={() => context("more")}
            >
                More
            </Button>
        </header>
    )
}

export default Navbar;
