import React, { Component, useEffect, useState } from 'react';

function useMarketPage() {

    // check if market page is open
    function isMarketPageOpen() {
        var marketPage = document.getElementById("marketPanel");
        return (typeof (marketPage) != 'undefined' && marketPage != null);
    }

    function insert(inputName, data) {
        if (!isMarketPageOpen()) console.error("The user is not currently on the market panel. Use PanelContext to switch.");

        var inputElement = document.getElementById(inputName);

        // set value using react's internal guy
        // from https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(inputElement, data);

        // send an event
        var ev2 = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(ev2);
    }

    /**
     * Inserts the the search term into the search input of the market page, then searches and displays results
     * User must be on search page
     * @param {the term to be searched} term 
     */
    function insertSearchTerm(term) {
        insert("tokenSearch", term);

        var searchButton = document.getElementById("tokenSearchButton");
        
        //this doesn't work and the button click still works so i'm leaving it
            //var searchForm = document.getElementById("searchForm"); 
            //searchForm.submit(); 

        // We have to wait for the state to change in order to search the terms
        // Yes this is bad code because I'm not sure how to do it otherwise
        setTimeout(() => {  
            console.log("lol");
            searchButton.click();   
        }, 200);
         
    }


    return { isMarketPageOpen, insertSearchTerm };
}

export { useMarketPage };