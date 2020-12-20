import React, { useState, useEffect } from 'react';

import { useWalletReady } from '../../functionality/CustomOceanHooks.js';
import { usePublish, usePricing } from '@oceanprotocol/react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';
import Label from '../Label.js';
import ConnectPanel from '../ConnectPanel.js';
import Correct from '../Correct.js';

import '../../styles/Market.css';

let Market = props => {

    //const request = new Request("https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?=");

    // Keeps track of text in search box
    let [searchTerms, setSearchTerms] = useState("");

    // Keeps track of fetched data using searchTerms
    let [searchResults, setSearchResults] = useState("");

    // Keeps track of page number of results
    let [pageNumber, setPageNumber] = useState(1);

    // Returns a Promise to evaluate for the data
    // Data is based on the search terms and page number
    async function getJsonData() {
        try {
            let data = await fetch('https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + searchTerms + '&page=' + pageNumber);
            let jsonData = await data.json();
            return jsonData;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    // Creates and returns next and prev page buttons to navigate search results
    // Buttons will not display if there are no search results (searchResults['total_pages'] == 0)
    // Prev button will not display if it is on page one (pageNumber == 1)
    // Next button will not display if it is on last page (pageNumber == searchResults['total_pages'])
    function renderPageButtons() {

        // if search results is empty, return nothing        
        if (searchResults == "") return;

        return (
            <div className="navButtons">
                {renderPrevButton()}
                {renderNextButton()}
            </div>
        );


    }

    // Creates a next page button
    function renderNextButton() {
        /*if (searchResults['total_pages'] == 0 || pageNumber == searchResults['total_pages']) {
            return;
        }*/
        return (
            <Button
                type="button"
                className="button nextPageButton"
                onClick={() => {
                    console.log("next");

                    // if the pageNumber == total pages, don't increment and don't fetch (do nothing)
                    if(pageNumber == searchResults['total_pages']) return;

                    // if the pageNumber == total pages, don't increment
                    setPageNumber(++pageNumber);

                    getJsonData().then(jsonData => {
                        console.log(jsonData);               
                        setSearchResults(jsonData);
                    });

                }}
            >
                {">>>"}
            </Button>
        );

    }

    // Creates a prev page button
    function renderPrevButton() {
        /*if (searchResults['total_pages'] == 0 || pageNumber == 1) {
            return;
        }*/
        return (
            <Button
                type="button"
                className="button prevPageButton"
                onClick={() => {
                    console.log("prev");

                    // if the pageNumber is 1, don't decrement and and don't fetch (do nothing)
                    if (pageNumber == 1) return;


                    setPageNumber(--pageNumber);

                    getJsonData().then(jsonData => {
                        console.log(jsonData);      
                        setSearchResults(jsonData);
                    });
                }}
            >
                {"<<<"}
            </Button>
        );
    }

    // creates an array of divs from the search results and returns is
    function renderResults() {
        let resultEntries = [];

        // if search results is empty, return nothing        
        if (searchResults == "") return;

        // for a single page 
        for (var i = 0; i < searchResults['results'].length; i++) {

            let asset = searchResults['results'][i];

            let datatokenSymbol = asset['dataTokenInfo']['symbol'];
            let datatokenPrice = asset['price']['ocean'];
            let assetName = asset['service'][0]['attributes']['main']['name'];
            let assetAuthor = asset['service'][0]['attributes']['main']['author'];
            let assetDesc = asset['service'][0]['attributes']['additionalInformation'] != null ?
                asset['service'][0]['attributes']['additionalInformation']['description'] : "No description availiable";

            let resultEntry =
                <div className="assetEntry" key={i}>
                    <header>
                        <div className="assetDatatokenSymbol">
                            {datatokenSymbol}
                        </div>
                        <div className="assetName">
                            {assetName}
                        </div>
                        <div className="assetAuthor">
                            {assetAuthor}
                        </div>
                    </header>

                    <div className="assetDesc">
                        {assetDesc}
                    </div>

                    <footer>
                        <div className="assetPrice">
                            {datatokenPrice} OCEAN
                        </div>
                    </footer>
                </div>;

            resultEntries.push(resultEntry);
        }



        return resultEntries;
    }

    return (
        <Panel>
            Browse the Ocean Market
            <form className={"form searchForm"}>

                <Input
                    type="text"
                    name="tokenSearch"
                    placeholder={searchTerms ? searchTerms : "Search for Data Tokens."}
                    value={searchTerms}
                    //help="Search for a dataset."
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setSearchTerms(value);
                    }}
                />
                <Button
                    type="button"
                    id="tokenSearchButton"
                    onClick={() => {
                        getJsonData().then(jsonData => {
                            console.log(jsonData);
                            setPageNumber("1");
                            setSearchResults(jsonData);
                        });
                    }}
                >
                    Search
                </Button>
            </form>
            <div className="results">

                <div className="navButtons">
                    {renderPrevButton()}
                    {renderNextButton()}
                </div>
                {pageNumber}

                {renderResults()}

                <div className="navButtons">
                    {renderPrevButton()}
                    {renderNextButton()}
                </div>

            </div>
        </Panel>
    );
}

export default Market;
export { Market };