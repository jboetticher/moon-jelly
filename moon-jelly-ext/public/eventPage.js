// listen for events from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  if (request.todo === "getLocalStorage") {
    sendResponse({ data: localStorage.getItem(request.key) });
  }
  else if (request.todo === "createSlateButton") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { });
    //alert("message recieved (alert for testing purposes)");
  }
  else if (request.todo === "publishSlateButton") {
    if (localStorage.getItem("slate_module") === "true") {
      chrome.tabs.create({
        url: chrome.extension.getURL('index.html'),
        active: false
      }, function (tab) {
        localStorage.setItem("slateToOcean", request.keyword);

        // after the tab has been created, open a window to inject the tab
        chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          focused: true,
          width: 365,
          height: 600
        }, function (w) {
          //alert("window open");
        });
      });
    }
  }
});

// Context menu ocean search
var contextMenuItem = {
  "id": "searchOnOcean",
  "title": "Search on Ocean",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "searchOnOcean" && clickData.selectionText) {
    //https://market.oceanprotocol.com/search?text=test

    chrome.tabs.create({
      url: chrome.extension.getURL('index.html'),
      active: false
    }, function (tab) {
      localStorage["searchOnOcean"] = clickData.selectionText;

      // after the tab has been created, open a window to inject the tab
      chrome.windows.create({
        tabId: tab.id,
        type: 'popup',
        focused: true,
        width: 365,
        height: 600
      }, function (w) {

      });
    });
  }
});
