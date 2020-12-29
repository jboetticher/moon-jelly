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
        if (inputElement != null) {
            // set value using react's internal guy
            // from https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
            var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            nativeInputValueSetter.call(inputElement, data);

            // send an event
            var ev2 = new Event('input', { bubbles: true });
            inputElement.dispatchEvent(ev2);

        }
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
        if (!isMintPageOpen()) console.error("The user is not currently on the mint panel. Use PanelContext to switch.");
        var descriptionElement = document.getElementById("dataDescription");
        descriptionElement.innerHTML = description;

        // send an event
        var ev2 = new Event('input', { bubbles: true });
        descriptionElement.dispatchEvent(ev2);
    }

    /**
     * Inserts metadata into the mint page to be published (instead of parsing the url). This step MUST be done BEFORE the insertion of the URL.
     * @param {json of metadata (in string format) to be sent to the ocean market} metadata
     */
    function insertMetaData(metadata) {
        insert("hiddenMetadata", metadata);
    }

    return { isMintPageOpen, insertAssetName, insertURL, insertAuthorName, insertDescription, insertMetaData };
}

export { useMintPage };