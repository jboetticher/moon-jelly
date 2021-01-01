// CONTROLS THE NETWORK THE ALERT SYSTEM IS ON
// 1INCH IS ALWAYS ON MAINNET
// CONTROLS JUST THE OCEAN FETCHING
//const network = 'mainnet';
const network = 'rinkeby';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name === "storageUpdate")
      //sendResponse({message: "hi to you"});
      console.log("storage update received in 1inch script");
      startAlarm();
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "1inch_alarm") {
        console.log("1inch alarm triggered");
    } 
});

// Starts the alarm if it doesn't exist
function startAlarm(){
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
function checkTriggers(){

}

// Gets and returns an array of all the triggers from localStorage
function getTriggersFromLocal(){

}

// Fetches quote from 1inch Exchange given param fromToken (toToken is always OCEAN)
// Returns promise to evaluate
function fetchOneInchQuote(fromToken){

}

// Fetches price of specific ocean asset given did (pool or fixed)
// Returns promise to evaluate
function fetchOceanPrice(did){


    
}