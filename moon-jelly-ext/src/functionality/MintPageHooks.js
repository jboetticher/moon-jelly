import React, { Component, useEffect, useState } from 'react';
import { useOcean } from '@oceanprotocol/react';

function useMintPage() {

    // check if mint page is open
    function isMintPageOpen() {
        var mintPage = document.getElementById("mintPanel");
        return (typeof (mintPage) != 'undefined' && mintPage != null);
    }

    function insert(inputName, data) {
        if (!isMintPageOpen()) console.error("The user is not currently on the mint panel. Use PanelContext to switch.");

        var inputElement = document.getElementById(inputName);
        if (inputElement != null) inputElement.value = data;
        else console.error("Could not find the " + inputName + " input.");
    }

    /**
     * Inserts the name into the asset name input of the mint page, if the user is on the mint page. Throws an error otherwise.
     * @param {the name of the data to be displayed on the ocean market} name 
     */
    function insertAssetName(name) {
        insert("dataname", name);
    }

    /**
     * Inserts a value into the asset name input of the mint page, if the user is on the mint page. Throws an error otherwise.
     * @param {the url of the data to be displayed on the ocean market} url 
     */
    function insertURL(url) {
        insert("dataurl", url);
    }

    /**
     * Inserts a value into the author input of the mint page, if the user is on the mint page. Throws an error otherwise.
     * @param {the name of the author to be displayed on the ocean market} authorName 
     */
    function insertAuthorName(authorName) {
        insert("dataAuthor", authorName);
    }

    /**
     * Inserts a value into the descrption input of the mint page, if the user is on the mint page. Throws an error otherwise.
     * @param {the description of the data to be displayed on the ocean market} description 
     */
    function insertDescription(description) {
        insert("dataDescription", description);
    }

    return { isMintPageOpen, insertAssetName, insertURL, insertAuthorName, insertDescription };
}

export { useMintPage };