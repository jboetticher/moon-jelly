// CONTROLS THE NETWORK THE ALERT SYSTEM IS ON
// 1INCH IS ALWAYS ON MAINNET
// CONTROLS JUST THE OCEAN FETCHING
//const network = 'mainnet';
const network = 'rinkeby';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name === "storageUpdate")

        console.log("storage update received in 1inch script");
    //startAlarm(); temp disabled for testing
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
    let alertList = window.localStorage.getItem("oneInchAlertList");

    /* alertList looks like this
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

    alertList.forEach((item, i) => {
        let currDid = item.did;
    });

}

// Returns a Promises.all() promise containing all the DDOs of oneInchAlertList
function getAllDDOs(){

}

// Returns a Promises.all() promise containing 1inch quotes for every type of tokens in oneInchAlertList
// Should prevent/reduce over-fetching of a token
function getAllQuotes(){

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