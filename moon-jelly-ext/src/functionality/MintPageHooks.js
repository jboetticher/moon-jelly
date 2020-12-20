import React, { Component, useEffect, useState } from 'react';
import { useOcean } from '@oceanprotocol/react';

function useMintPage() {

    // check if mint page is open
    function isMintPageOpen() {
        var mintPage = document.getElementById("mintPanel");
        return (typeof (mintPage) != 'undefined' && mintPage != null);
    }

    // set author name method
    // 1. check for open mint, otherwise throw error
    // 2. find element with id "dataname"
    // 3. slap it into the value section


    // set data url method
    // 1. check for open mint, otherwise throw error
    // 2. find element with id "dataurl"
    // 3. slap it into the value section

    // set author name method
    // 1. check for open mint, otherwise throw error
    // 2. find element with id "author"
    // 3. slap it into the value section

    // set description input method
    // 1. check for open mint, otherwise throw error
    // 2. find element with id "dataDescription"
    // 3. slap it into the value section

    return { isMintPageOpen };
}

export { useMintPage };