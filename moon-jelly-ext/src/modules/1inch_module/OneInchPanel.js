import React, {useContext} from 'react';
import Input from '../../components/Form/Input.js';
import Button from '../../components/Button.js';
import AssetList from '../../components/AssetList.js';

import Tokens from './assets/tokens.json';

import { useBookmarks } from '../../functionality/BookmarkHooks.js';

let OneInchPanel = props => {

    const { getBookmarks } = useBookmarks();
    

    const availiableTokens = getTokenArray();

    // Parses JSON file into an Javascript array of JSON objects
    function getTokenArray(){
        let tokenArray = [];
        
        for(var i in Tokens['tokens']){
            tokenArray.push(Tokens['tokens'][i]);
        }
        return tokenArray;
    }

    // Fetches a quote from 1inch using parameter as fromToken and OCEAN as the toToken
    // fromTokenAmount is the true number of tokens you want to check (decimals are added in the function)
    // Returns a promise to evaluate for the JSON response
    function quoteFetch(fromTokenAddress, fromTokenAmount){

        // Number of minimal divisible units of the token
        let decimals = Tokens['tokens'][fromTokenAddress]['decimals'];

        // Add the correct number of decimals to the provided token amount
        let decimaledAmount = fromTokenAmount * 10**decimals;

        // toTokenAddress is OCEAN
        let reqURL = "https://api.1inch.exchange/v2.0/quote?fromTokenAddress="
                        + fromTokenAddress + 
                    "&toTokenAddress=0x967da4048cd07ab37855c090aaf366e4ce1b9f48&amount="
                        + decimaledAmount;

        return fetch(reqURL).then(res => res.json());
    }

    return(
        <div className="oneInchPanel">
            <Button
                onClick={ () =>{
                    /*fetch(reqURL).then(res => res.json())
                    .then(data => console.log(data));*/
                    //console.log(availiableTokens);
                    //console.log(quoteFetch("0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a", 25.03));
                    quoteFetch("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 3).then(data => console.log(data));
                }}
            >
                token data
            </Button>
            <Input>
            </Input>

        </div>  
    );
}

export default OneInchPanel;
export {OneInchPanel}