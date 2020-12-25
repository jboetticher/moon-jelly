chrome.runtime.onInstalled.addListener(function () {
    alert("sick im installed");
    console.log("bro");
    startAlarm();
});

chrome.runtime.onStartup.addListener(() => {
    console.log('onStartup....');
    startAlarm();
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("alram");

    //console.log(window.localStorage.getItem("keywordDate_rinkeby"));    
    //console.log("this one is: ", window.localStorage.getItem("lol no exist")); 

    if (alarm.name === "refetch") {
        //alert("yo 1 min");
        console.log("1 min pass yay");
        //fetchOceanData("test", 1).then(res => console.log(res));
        filterNewAssets();
    }
});

function startAlarm() {
    chrome.alarms.get("refetch", alarm => {
        if (alarm) {
            // alarm exists, do nothing
        } else {
            // start the alarm since it doesn't exist
            chrome.alarms.create("refetch", {
                delayInMinutes: 1,
                periodInMinutes: 1
            });
        }
    })
}

function filterNewAssets() {
    // get the filter date created by the the alerts panel
    let filterDate = window.localStorage.getItem("keywordDate_rinkeby");

    // if no date, nothing to process
    if (filterDate == null) return;

    // get the keywords created by alerts panel (should be an array after parsing)
    let keywords = JSON.parse(window.localStorage.getItem("keywords_rinkeby"));

    // if no keywords, nothing to process
    if (keywords == null) return;

    let promiseArray = [];
    keywords.forEach((keyword, index) => {
        promiseArray.push(fetchRecentOceanData(keyword, 1));
    });

    // array to keep track of new assets (assets that were created past the filter date)
    // use a set to prevent duplicates
    let filteredAssets = new Set();

    // Evaluate all fetched promises
    Promise.all(promiseArray).then((data) => {
        //console.log(data);

        // Loop through the array of keyword results
        // each entry is the fetched results of a diff keyword
        data.forEach((keywordResult) => {
            keywordResult['results'].forEach((asset) => {

                // Compare the creation date with the filter date
                // If the creation date is greater, it is a new asset
                if(asset['created'] >= filterDate){
                    console.log("NEW ASSET FOUND", asset);

                    // add the asset DID into the set
                    filteredAssets.add(asset['id']);
                }
            })
        });

        // grab the old array
        let keywordAssets = window.localStorage.getItem("keywordAssets_rinkeby");

        // merge the old array with the newly found new assets
        let merged = keywordAssets.concat(Array.from(filteredAssets));

        // Store the merged assets in local storage (Stringify an array) 
        window.localStorage.setItem("keywordAssets_rinkeby", JSON.stringify(merged));

        // Update date to current date (don't want to get new assets again)
        window.localStorage.setItem("keywordDate_rinkeby", new Date().toISOString());
    });

    //fetchRecentOceanData("test", 1).then(res => console.log(res));    

}

async function fetchRecentOceanData(keyword, page) {
    let network = 'rinkeby';

    // post method stopped working for some reason
    /*return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/query', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": 'application/json'
        },
        cache: 'no-cache', 
        credentials: 'same-origin', 
        body: JSON.stringify({
            "page": 1,
            "offset": 100,
            "query": {
                "native ": 1,
                "query_string": {
                    "query": "-isInPurgatory:true"
                }
            },
            "sort": {"created": -1},
            "text": keyword
        })
    })
    .then(res => res.json());*/

    return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/query?text=' + keyword + '&page=' + page + '&sort={"created": -1}')
            .then(data => data.json());
}