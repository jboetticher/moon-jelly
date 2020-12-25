chrome.runtime.onInstalled.addListener(function() {
    alert("sick im installed");
    console.log("bro");
    chrome.alarms.create("1min", {
        delayInMinutes: 1,
        periodInMinutes: 1
    });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("alram");
    if (alarm.name === "1min") {
      //alert("yo 1 min");
      console.log("1 min pass yay");
    }
});