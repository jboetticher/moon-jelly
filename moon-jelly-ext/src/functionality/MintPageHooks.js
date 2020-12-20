import React, { Component, useEffect, useState } from 'react';
import { useOcean } from '@oceanprotocol/react';

function useMintPage() {

    // check if mint page is open
    function isMintPageOpen() {
        var mintPage = document.getElementById("mintPanel");
        return (typeof (mintPage) != 'undefined' && mintPage != null);
    }

    function insert(inputName, data)
    {
        if(!isMintPageOpen()) console.error("The user is not currently on the mint panel. Use PanelContext to switch.");

        var inputElement = document.getElementById(inputName);
        if(inputElement != null) inputElement.value = data;
        else console.error("Could not find the " + inputName + " input.");
    }

    /**
     * Inserts a value into the asset name input of the mint page, if the user is on the mint page. Throws an error otherwise.
     * @param {the name of the author to be displayed on the ocean market} authorName 
     */
    function insertAssetName(url) {
        
    }

    // set data url method
    // 1. check for open mint, otherwise throw error
    // 2. find element with id "dataurl"
    // 3. slap it into the value section
    function insertURL(url)
    {

    }

    /**
     * Inserts a value into the author input of the mint page, if the user is on the mint page. Throws an error otherwise.
     * @param {the name of the author to be displayed on the ocean market} authorName 
     */
    function insertAuthorName(authorName)
    {
        if(!isMintPageOpen()) console.error("The user is not currently on the mint panel. Use PanelContext to switch.");

        var authorVariable = document.getElementById("dataAuthor");
        if(authorVariable != null) authorVariable.value = authorName;
        else console.error("Could not find the author name input.");
    }

    // set description input method
    // 1. check for open mint, otherwise throw error
    // 2. find element with id "dataDescription"
    // 3. slap it into the value section
    function insertDescription(description)
    {
        
    }

    return { isMintPageOpen, insertAssetName, insertURL, insertAuthorName, insertDescription };
}

export { useMintPage };