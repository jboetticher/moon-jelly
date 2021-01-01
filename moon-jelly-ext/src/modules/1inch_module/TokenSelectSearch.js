import React from 'react';
import Tokens from './assets/tokens.json';
import SelectSearch from 'react-select-search';
import './SelectSearch.css';

let TokenSelectSearch = props => {

    // Array of all swapabble tokens
    const availiableTokens = getTokenArray();

    // Parses JSON file into an Javascript array of JSON objects
    function getTokenArray() {
        let tokenArray = [];

        for (var i in Tokens['tokens']) {
            tokenArray.push(Tokens['tokens'][i]);
        }
        return tokenArray;
    }

    // Creates a set of options for the SelectSearch box
    // smallSearch prop - only show logo and symbol
    function selectOptions() {

        let options = [];

        if (props.smallSearch) {
            availiableTokens.forEach((token, i) => {
                let symbol = token['symbol'];
                let address = token['address'];
                //let name = token['name'];
                let logo = token['logoURI'];
                options.push({
                    "value": address,
                    "name": symbol,
                    "key": i,
                    "logo": logo,
                    "symbol": symbol
                });
            });
        }
        else {
            availiableTokens.forEach((token, i) => {
                let symbol = token['symbol'];
                let address = token['address'];
                let name = token['name'];
                let logo = token['logoURI'];
                options.push({
                    "value": address,
                    "name": name,
                    "key": i,
                    "logo": logo,
                    "symbol": symbol
                });
            });
        }

        return options;
    }

    // Custom render for each option in SelectSearch
    function renderToken(props, option, snapshot, className) {
        return (
            <button {...props} className={className} type="button">
                <img alt="" width="32" height="32" src={option.logo} />
                <span>{option.symbol}</span>
                <span>{option.name}</span>
            </button>
        );
    }

    // Custom render for each option in SelectSearch, but only symbol
    function renderTokenSmall(props, option, snapshot, className) {
        return (
            <button {...props} className={className + " small-search-option"} type="button">
                <img alt="" width="16" height="16" src={option.logo} />
                <span>{option.name}</span>
            </button>
        );
    }

    function renderSearch() {
        if (props.smallSearch) {
            return <SelectSearch
                options={selectOptions()}
                search
                //printOptions="always"
                renderOption={renderTokenSmall}
                {...props}
            />
        }
        else {
            return <SelectSearch
                options={selectOptions()}
                search
                //printOptions="always"
                renderOption={renderToken}
                {...props}
            />
        }
    }

    return (
        renderSearch()
    );
}
export default TokenSelectSearch
