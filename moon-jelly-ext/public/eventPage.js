var contextMenuItem = {
  "id": "searchOnOcean",
  "title": "Search on Ocean",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "searchOnOcean" && clickData.selectionText) {
    //alert("Context Menu Clicked! " + clickData.selectionText);

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

var slateButtonInterval = setInterval(function() { 
  if(document.getElementById('aButton')) {
      //  clearInterval(myVar);
      return false;
  } else {
      if(document.getElementsByClassName("assignedToUsers")[0]) {
          var button = document.createElement("button");
          button.innerHTML = "Test Button AHHHHH";
          button.style="position:absolute; left:10; bottom: 10;"
          button.id = "aButton";
          button.type = "button";
          //document.getElementsByClassName("assignedToUsers")[0].appendChild(button);

          var theButton = document.getElementById('aButton');
          theButton.addEventListener('click', function() {
              //console.log(document.getElementsByClassName("ms-TextField-field")[0].value);
              console.log('glib glob');
          });
      }
  }
}, 500);