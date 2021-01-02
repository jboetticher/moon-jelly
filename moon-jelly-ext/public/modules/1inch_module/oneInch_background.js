chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name === "storageUpdate")

    console.log("storage update received in 1inch script");
    //startAlarm(); temp disabled for testing
    //getAllQuotes().then(data => console.log(data));
    checkTriggers();
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "1inch_alarm") {
        console.log("1inch alarm triggered");
    }
});

// Starts the alarm if it doesn't exist
function startAlarm() {
    chrome.alarms.get("1inch_alarm", alarm => {
        if (alarm) {
            // alarm exists, do nothing
        } else {
            // start the alarm since it doesn't exist
            chrome.alarms.create("1inch_alarm", {
                delayInMinutes: 30,
                periodInMinutes: 30
            });
        }
    })
}

// Compares fetched ocean and oneinch data to local
function checkTriggers() {

    let alertList = JSON.parse(window.localStorage.getItem("oneInchAlertList"));
    /* the stored alertList looks like this, as reference
    [
        {
            "did": didhere,
            "assetName": assetnamehere,
            "datatokenSymbol": datatokensymbolhere,
            "entries": [{
                "selection": "above",
                "amount": 0,
                "token": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "tokenSymbol": "ETH"
            },
            {
                "selection": "above",
                "amount": 0,
                "token": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "tokenSymbol": "ETH"
            }]
        },
        {
            "did": etc,
            "assetName": etc,
            "datatokenSymbol": etc,
            "entries": array of jsons
        },
    ]
    */

    let priceArray = [];

    let quotesArray = [];

    getAllDDOs()
    .then(ddoList => {
        ddoList.forEach((ddo) => {
            priceArray.push({
                "did": ddo.id,
                "oceanPrice": ddo['price']['value']
            });
        });
        return getAllQuotes();
    })
    .then(quotesList => {
        quotesList.forEach((quote) => {
            // divide the amount output by the decimals to find how much OCEAN that 1 token is worth
            quotesArray.push({
                "tokenAddress": quote['fromToken']['address'],
                "swapRate": (quote['toTokenAmount'] / 10 ** parseFloat(quote['fromToken']['decimals']))
            });
        })
    })
    .then(() => {
        console.log("pricees", priceArray);
        console.log("swaps", quotesArray);
        // compare/check the triggers
    })

    /*alertList.forEach((item, i) => {
        let currDid = item.did;



    });*/

}

// Returns a Promises.all() promise containing all the DDOs of oneInchAlertList
function getAllDDOs() {
    // Get the stored array by parsing
    let alertList = JSON.parse(window.localStorage.getItem("oneInchAlertList"));

    // To hold all the DDO promises
    let DDOPromises = [];

    // Loop through assets
    alertList.forEach((asset, i) => {

        // Add DDO fetch promises to array
        DDOPromises.push(fetchOceanDDO(asset['did']));
    });

    // Return one big promise
    return Promise.all(DDOPromises);
}

// Returns a Promises.all() promise containing 1inch quotes for every type of tokens in oneInchAlertList
// Should prevent/reduce over-fetching of a token
function getAllQuotes() {
    // Get the stored array by parsing
    let alertList = JSON.parse(window.localStorage.getItem("oneInchAlertList"));

    // Store token addresses as a set to prevent duplicates
    let tokenSet = new Set();

    // Loop through the assets
    alertList.forEach((asset, i) => {
        console.log("this is the asset", asset);

        // Get the array of alerts in the asset
        let currEntries = asset['entries'];

        // Loop through each alert entry
        currEntries.forEach((entry, j) => {

            // Add token address to the set
            tokenSet.add(entry['token']);
        });

    });

    // To hold all the promises
    let quotePromises = [];

    // Loop through each token address and create a promise
    tokenSet.forEach((tokenAddress) => {

        // Add fetch promise into array
        quotePromises.push(fetchOneInchQuote(tokenAddress));
    });

    // Return one big promise
    return Promise.all(quotePromises);
}


// Fetches quote from 1inch Exchange given param fromToken (toToken is always OCEAN)
// Returns promise to evaluate
function fetchOneInchQuote(fromToken) {
    // toTokenAddress is OCEAN
    let reqURL = "https://api.1inch.exchange/v2.0/quote?fromTokenAddress="
        + fromToken +
        "&toTokenAddress=0x967da4048cd07ab37855c090aaf366e4ce1b9f48&amount="
        + 10 ** 18;

    return fetch(reqURL).then(res => res.json());
}

// Fetches DDO of specific ocean asset given DID
// Returns promise to evaluate for JSON results
function fetchOceanDDO(did) {
    return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/' + did)
        .then(data => data.json());
}