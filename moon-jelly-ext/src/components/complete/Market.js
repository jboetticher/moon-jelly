import React, { useState, useEffect } from 'react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';

import MarketAssetList from '../MarketAssetList';
import '../../styles/Market.css';

import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'

let Market = props => {

    const { fetchDataBySearchterm } = useAquariusFetch();

    //const request = new Request("https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?=");

    // Keeps track of text in search box
    let [searchTerms, setSearchTerms] = useState("");

    // Keeps track of fetched data using searchTerms
    let [searchResults, setSearchResults] = useState("");

    // Keeps track of page number of results
    let [pageNumber, setPageNumber] = useState(1);

    // Returns a Promise to evaluate for the data
    // Data is based on the search terms and page number
    /*async function getJsonData() {
        try {
            let data = await fetch('https://aquarius.rinkeby.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + searchTerms + '&page=' + pageNumber);
            let jsonData = await data.json();
            return jsonData;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }*/

    // Creates a next page button
    function renderNextButton() {
        return (
            <Button
                type="button"
                className="button pageButton"
                onClick={() => {
                    console.log("next");

                    // if the pageNumber == total pages, don't increment and don't fetch (do nothing)
                    if (pageNumber == searchResults['total_pages']) return;

                    // if the pageNumber == total pages, don't increment
                    setPageNumber(++pageNumber);

                    fetchDataBySearchterm('rinkeby', searchTerms, pageNumber).then(jsonData => {
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

        return (
            <Button
                type="button"
                className="button pageButton"
                onClick={() => {
                    console.log("prev");

                    // if the pageNumber is 1, don't decrement and and don't fetch (do nothing)
                    if (pageNumber == 1) return;

                    setPageNumber(--pageNumber);

                    fetchDataBySearchterm('rinkeby', searchTerms, pageNumber).then(jsonData => {
                        console.log(jsonData);
                        setSearchResults(jsonData);
                    });
                }}
            >
                {"<<<"}
            </Button>
        );
    }

    // Creates the results panel with page nav buttons
    function renderResults() {
        // if search results is empty, return nothing        
        if (searchResults == "") return;

        // if search results has empty results
        if (searchResults['total_pages'] == 0) return "No results found";

        return (
            <div className="results">

                <div className="navButtons">
                    {renderPrevButton()}
                    {renderNextButton()}
                </div>
                {pageNumber}

                <MarketAssetList results={searchResults}> </MarketAssetList>

                <div className="navButtons">
                    {renderPrevButton()}
                    {renderNextButton()}
                </div>

            </div>
        );
    }

    return (
        <div id="marketPanel">
            <Panel>
                Browse the Ocean Market
            <form className={"form searchForm"}>

                    <Input
                        type="text"
                        id="tokenSearch"
                        placeholder={searchTerms ? searchTerms : "Search for Data Tokens."}
                        value={searchTerms}
                        onChange={(e) => {
                            const { name, value } = e.target;
                            setSearchTerms(value);
                            //console.log("set searchterm as", value);
                        }}
                    />
                    <Button
                        type="button"
                        id="tokenSearchButton"
                        onClick={() => {
                            /*getJsonData().then(jsonData => {
                                console.log(jsonData);
                                setPageNumber("1");
                                setSearchResults(jsonData);
                            });*/
                            fetchDataBySearchterm('rinkeby', searchTerms, '1').then(jsonData => {
                                console.log(jsonData);
                                setPageNumber("1"); // resets page number to 1 if it was not 1
                                setSearchResults(jsonData);
                            });
                        }}
                    >
                        Search
                </Button>
                </form>

                {renderResults()}

            </Panel>

        </div>


    );
}

export default Market;
export { Market };