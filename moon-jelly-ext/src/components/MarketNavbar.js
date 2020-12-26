import React, { useContext } from 'react';
import { PanelContext } from '../App.js';

import Button from './Button.js';

import '../styles/Market.css';

let MarketNavbar = props => {
    let setNextPanel = useContext(PanelContext);

    return (
        <div className="subNav">
            <Button
                primary={props.selected == "market"} noRound
                onClick={() => setNextPanel('market')}
            >
                Browse

            </Button>
            <Button
                primary={props.selected == "bookmarks"} noRound
                onClick={() => setNextPanel('bookmarks')}
            >
                Bookmarks
            </Button>
            <Button
                primary={props.selected == "wallet"} noRound
                onClick={() => setNextPanel('wallet')}
            >
                Wallet
            </Button>
        </div>
    );
}

export default MarketNavbar;
export { MarketNavbar };