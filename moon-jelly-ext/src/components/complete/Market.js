import React, { useState, useContext } from 'react';

import Input from '../Form/Input.js';
import Button from '../Button.js';
import Panel from '../Panel.js';

import MarketAssetList from '../MarketAssetList';
import '../../styles/Market.css';

import { useAquariusFetch } from '../../functionality/CustomOceanHooks.js'
import { PanelContext } from '../../App.js';

//import { useMarketPage } from '../../functionality/MarketPageHooks.js'

let Market = props => {

    const { fetchDataBySearchterm } = useAquariusFetch();

    //const { insertSearchTerm } = useMarketPage();

    // Keeps track of text in search box
    let [searchTerms, setSearchTerms] = useState("");

    // Keeps track of fetched data using searchTerms
    let [searchResults, setSearchResults] = useState("");

    // Keeps track of page number of results
    let [pageNumber, setPageNumber] = useState(1);

    let setNextPanel = useContext(PanelContext);

    // Creates a next page button
    function renderNextButton() {
        if (pageNumber == searchResults['total_pages']) return;

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

                    fetchDataBySearchterm(/*'rinkeby',*/ searchTerms, pageNumber).then(jsonData => {
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

        if (pageNumber == 1) return <div></div>;

        return (
            <Button
                type="button"
                className="button pageButton"
                onClick={() => {
                    console.log("prev");

                    // if the pageNumber is 1, don't decrement and and don't fetch (do nothing)
                    if (pageNumber == 1) return;

                    setPageNumber(--pageNumber);

                    fetchDataBySearchterm(/*'rinkeby',*/ searchTerms, pageNumber).then(jsonData => {
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
        if (searchResults['total_pages'] == 0) return <div>No results found</div>;

        return (
            <div className="results">

                <div className="navButtons">
                    {renderPrevButton()}
                    <span>{pageNumber}</span>
                    {renderNextButton()}
                </div>


                <MarketAssetList results={searchResults}> </MarketAssetList>

                <div className="navButtons">
                    {renderPrevButton()}
                    <span>{pageNumber}</span>
                    {renderNextButton()}
                </div>

            </div>
        );
    }

    return (
        <div id="marketPanel">
            <Panel>
                Browse the Ocean Market
                <form id={"searchForm"} onSubmit={(e) => {
                    e.preventDefault();
                    fetchDataBySearchterm(/*'rinkeby',*/ searchTerms, '1').then(jsonData => {
                        console.log(jsonData);
                        setPageNumber("1"); // resets page number to 1 if it was not 1
                        setSearchResults(jsonData);
                    });
                }}>
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
                        type="submit"
                        id="tokenSearchButton"
                    >
                        Search
                </Button>
                </form>

                <Button
                    onClick={() => setNextPanel('bookmarks')}
                >
                    <div className="mx-2">
                        Bookmarks
                    </div>
                </Button>

                        
                <Button
                    /*TEMPORARY BUTTON FOR DEVELOPMENT/TESTING */
                    onClick={() => setNextPanel('wallet')}
                >
                    <div className="mx-2">
                        wallet
                    </div>
                </Button>

                {renderResults()}

            </Panel>

        </div>
    );
}

export default Market;
export { Market };