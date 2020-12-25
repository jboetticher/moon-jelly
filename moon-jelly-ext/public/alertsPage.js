chrome.runtime.onInstalled.addListener(function() {
    alert("sick im installed");
    console.log("bro");
    startAlarm();
});

chrome.runtime.onStartup.addListener(() => {
    console.log('onStartup....');
    startAlarm();
  });

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("alram");

    console.log(window.localStorage.getItem("keywordDate_rinkeby"));    
    console.log("this one is: ", window.localStorage.getItem("lol no exist")); 

    if (alarm.name === "refetch") {
      //alert("yo 1 min");
      console.log("1 min pass yay");
      fetchOceanData("dab").then(res => console.log(res));
    }
});

function startAlarm(){
    chrome.alarms.get("refetch", alarm => {
        if(alarm){
            // alarm exists, do nothing
        } else{
            // start the alarm since it doesn't exist
            chrome.alarms.create("refetch", {
                delayInMinutes: 1,
                periodInMinutes: 1
            });
        }
    })
}

function filterNewAssets(){
    let filterDate = window.localStorage.getItem("keywordDate_rinkeby");
    filterDate != null ? filterDate : new Date().toISOString();
}

async function fetchOceanData(keyword){
    let network = 'rinkeby';

    return fetch('https://aquarius.' + network + '.oceanprotocol.com/api/v1/aquarius/assets/ddo/query', {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "page": 1,
            "offset": 100,
            "query": {
                "nativeSearch": 1,
                "query_string": {
                    "query": "-isInPurgatory:true"
                }
            },
            "sort": { 
                "created": 1,
                "dataToken": 1 
            },
            "text": keyword
        })
    })
    .then(res => res.json());
}