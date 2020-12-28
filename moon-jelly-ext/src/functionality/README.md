# React Hooks
Moon Jelly comes with a variety of React Hooks for developers to use when adding on to the main extension or your own module.  

If you find that a hook works improperly or inefficiently, please feel free to open an issue or contribute a fix.

[Bookmark Hooks](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#bookmarkhooksjs)
- [useBookmarks](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#usebookmarks)
    - [addBookmark(didToAdd)](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#addbookmarkdidtoadd)  
    - [removeBookmark(didToRemove)](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#removebookmarkdidtoremove)  
    - [getBookmarks()](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#getbookmarks) 

[Custom Ocean Hooks](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#customoceanhooksjs)
- [useWalletReady](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#usewalletready)  
    -[walletConnected](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#walletconnected)
- [useAquariusFetch](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#useaquariusfetch)
    - [fetchDataBySearchterm(searchterm, page)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#fetchdatabysearchtermsearchterm-page)
    - [fetchDataByWallet(walletid)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#fetchdatabywalletwalletid)
    - [fetchDataBySort(sortParams)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#fetchdatabysortsortparams)
    - [fetchDDO(did)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#fetchddodid)
    
[Market Page Hooks](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#marketpagehooksjs)
- [useMarketPage](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#useMarketPage)
    - [isMarketPageOpen()](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#ismarketpageopen)
    - [insertSearchTerm(term)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#insertsearchtermterm)
    
[Mint Page Hooks](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#mintpagehooksjs)
- [useMintPage](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#useMintPage)
    - [isMintPageOpen()](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#insertsearchterm)
    - [insertAssetName(name)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#insertassetnamename)
    - [insertURL(url)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#inserturlurl)
    - [insertAuthorName(authorName)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#insertauthornameauthorname)
    - [insertDescription(description)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#insertdescriptiondescription)
    - [insertMetaData(metadata)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#insertmetadatametadata)
    
[Web Storage Hooks](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#webstoragehooksjs)
- [useWebStorage](https://github.com/jboetticher/moon-jelly/blob/main/moon-jelly-ext/src/functionality/README.md#useWebStorage)
    - [storageAvailable(type)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#storageavailabletype)
    - [storeToLocal(key, value)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#storetolocalkey-value)
    - [getFromLocal(key)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#getfromlocalkey) 
    - [removeFromLocal(key)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#removefromlocalkey)
    - [storeArrayToLocal(key, array)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#storearraytolocalkey-array)
    - [getArrayFromLocal(key)](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality#getarrayfromlocalkey)

# BookmarkHooks.js
Add, remove, and get bookmarks from Window.localStorage.

Bookmarks are stored as "bookmarks_network" in localStorage (ie "bookmarks_mainnet", "bookmarks_rinkeby") and contain a stringified array of datatoken asset DIDs.  

Window.localStorage can be viewed in `Application > Local Storage` of the Chrome developer console.

## useBookmarks
### addBookmark(didToAdd)
Adds the given datatoken DID into "bookmarks_network" in Window.localStorage

### removeBookmark(didToRemove)
Removes the given datatoken DID into "bookmarks_network" in Window.localStorage

### getBookmarks()
Returns an array of datatoken DIDs retrived from "bookmarks_network" of Window.localStorage

## useBookmarks Example Implementation
See `src/components/complete/Bookmarks.js` for a working usage of the bookmark hooks
```JSX
// Import the hook
import { useBookmarks } from '.../functionality/BookmarkHooks.js';

let myComponent = props => {

    // Declare whatever functions you want to use from the hook
    const { getBookmarks, addBookmark, removeBookmark } = useBookmarks();
    
    // Now you can use getBookmarks(), addBookmark(), and removeBookmark() within the component
    
    return(
        <div>
            Test component
        </div>
    );
}

export myComponent;
```

# CustomOceanHooks.js
## useWalletReady
Determines whether or not a wallet has been connected.

### walletConnected
- `true` if wallet is connected
- `false` if wallet is not connected

## useWalletReady Example Implementation
See `src/components/complete/Mint.js` for a working usage of the useWalletReady hook
```JSX
// Import the hook
import { useWalletReady } from '.../functionality/CustomOceanHooks.js';

let myComponent = props => {

    // Declare whatever functions you want to use from the hook
    const { walletConnected } = useWalletReady();
    
    // Now you can use walletConnected within the component
    
    function checkWalletTest(){
        if(walletConnected){
            console.log("The wallet is connected!");
        }
        else {
            console.log("No wallet connected");
        }
    }
    
    return(
        <Button
            onClick={checkWalletTest()}
        >
        </Button>
    );
}

export myComponent;
```

## useAquariusFetch
Functions to help query the Ocean Market via aquarius more conveniently.  

The network that it fetches from is dependent on the config in `App.js`.

### fetchDataBySearchterm(searchterm, page)
Fetches from aquarius and returns a `Promise` to evaluate with the results.  
- searchterm - `string` text to filter the search results by
- page - `int` page of the results to query, typically '1' 

### fetchDataByWallet(walletid)
Fetches from aquarius and returns a `Promise` to evaluate with the results. 
- walletid - `string` of the wallet address to filter the search results by

### fetchDataBySort(sortParams)
Fetches from aquarius and returns a `Promise` to evaluate with the results. 
- sortParams - JSON object to filter results by
```JSON
{
    "page": 2,
    "offset": 100,
    "query": {
        "nativeSearch": 1,
        "query_string": {
            "query": "-isInPurgatory:true"
        }
    },
    "sort": { "dataToken": 1 },
    "text": "data"
}
```
- Documentation on what you can filter by is from https://docs.oceanprotocol.com/references/aquarius/#assetsddoquery but is a little lacking, so I have included what I do know you can do.
- `"sort": { "created": 1 }` is ascending sort of assets (earliest date first)
- `"sort": { "created": -1 }` is descending sort of assets (most recent date first)

### fetchDDO(did)
Fetches the metadata of a DID from aquarius and returns a `Promise` to evaluate with the results
- did - `string` DID of the datatoken to get the metadata of

## useAquariusFetch Example Implementation
See `src/components/complete/Market.js` for a working usage of the useAquariusFetch hook
```JSX
// Import the hook
import { useAquariusFetch } from '.../functionality/CustomOceanHooks.js';

let myComponent = props => {

    // Declare whatever functions you want to use from the hook
    const { fetchDataBySearchterm, fetchDataByWallet, fetchDataBySort, fetchDDO } = useAquariusFetch();
    
    // Now you can use fetchDataBySearchterm() fetchDataByWallet() fetchDataBySort() fetchDDO() within the component
    
    function searchTest(){
        // Searches "test" on the Ocean Market
        fetchDataBySearchterm("test", "1").then(jsonData => {

            // Logs the data to console when Promise has evaluated
            console.log(jsonData);
        });
    }
    
    return(
        <Button
            onClick={searchTest()}
        >
        </Button>
    );
}

export myComponent;
```

# MarketPageHooks.js
## useMarketPage
Functions to help interact and send data to the Market search page

### isMarketPageOpen()
Checks if the Market search page is open  
Returns `true` or `false`

### insertSearchTerm(term)
Inserts the the search term into the search input of the market page, then searches and displays results  
*User must be on the search page for insertSearchTerm to work  

The implementation of this function uses a setTimeout() currently as a workaround, and fixes to it would be appreciated 
- term - `string` text what the search bar should have

## useMarketPage Example Implementation
```JSX
// Import the hook
import { useMarketPage } from '.../functionality/MarketPageHooks.js';

let myComponent = props => {

    // Declare whatever functions you want to use from the hook
    const { insertSearchTerm } = useMarketPage();
    
    // Now you can use insertSearchTerm() within the component
    // Keep in mind for insertSearchTerm, the market page MUST be open for it to work
    // See useMintPage implementation example on how to swap pages
    // If you have an idea for a better implementation of the hook, we encourage you to open an issue or contribute
    
    // Puts "cool data" in the search box and searches
    function insertTest(){
        insertSearchTerm("cool data");
    }
    
    // Button triggers the search for "cool data"
    return(
        <Button
            onClick={insertTest()}
        >
        </Button>
    );
}

export myComponent;
```

# MintPageHooks.js
## useMintPage
Functions to help interact and send data to the Mint page.

### isMintPageOpen()
Checks if the Mint page is open  
Returns `true` or `false`

### insertAssetName(name)
Inserts the name into the asset name input of the mint page, if the user is on the mint page. Throws an error otherwise.
- name - `string` the name of the data to be displayed on the ocean market

### insertURL(url)
Inserts a value into the asset name input of the mint page, if the user is on the mint page. Throws an error otherwise.
- url - `string` the url of the data to be displayed on the ocean market

### insertAuthorName(authorName)
Inserts a value into the author input of the mint page, if the user is on the mint page. Throws an error otherwise.
- authorName - `string` the name of the author to be displayed on the ocean market

### insertDescription(description)
Inserts a value into the descrption input of the mint page, if the user is on the mint page. Throws an error otherwise.
- description - the description of the data to be displayed on the ocean market

### insertMetaData(metadata)
Inserts metadata into the mint page to be published (instead of parsing the url). This step MUST be done BEFORE the insertion of the URL.
- metadata - json of metadata (as `string`) to be sent to the ocean market

## useMintPage Example Implementation
See `src/module/slate_module/SlateFetch.js` for a working usage of the useMintPage hook.
```JSX
// Import the hook
import { useMintPage } from '.../functionality/MintPageHooks.js';

// For swapping pages
import { PanelContext } from '../../App.js';

let myComponent = props => {

    // Declare whatever functions you want to use from the hook
    const { insertAssetName, insertURL, insertAuthorName, insertDescription, insertMetaData } = useMintPage();
    
    // Use this to swap pages
    const goToPage = useContext(PanelContext);
    
    // Now you can use insertAssetName(), insertURL(), insertAuthorName(), insertDescription(), insertMetaData() within the component
    // If you have an idea for a better implementation of the hook, we encourage you to open an issue or contribute
    
    function exportToMintPage(type, url, title, author, body) {
        goToPage("mint", () => {
            insertMetaData(JSON.stringify({
                checksum: "",
                contentLength: undefined,//x.size, 
                contentType: type,
                encoding: "",
                compression: ""
            }));
            insertURL(url);
            insertAssetName(title);
            insertAuthorName(author);
            insertDescription(body);
        });
    }
    
    // Button triggers a change to the mint page and auto-fills the input boxes
    return(
        <Button
            onClick={exportToMintPage("csv", "https://data_url", "test data", "author guy", "my description")}
        >
        </Button>
    );
}

export myComponent;
```

# WebStorageHooks.js
The storage of the extension is completely in Window.localStorage. This could be changed to utilize the chrome extension API's storage system, which may work better than our current implementation.  

Based off of https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  

Important note: All key/value pairs are stored as pure strings within localStorage. We use JSON.stringify() to store arrays as strings, and JSON.parse() to retrieve those arrays.

## useWebStorage
### storageAvailable(type)
Function to check if a certain webstorage type is availiable
- type - type of webstorage to access, typically 'localStorage'

### storeToLocal(key, value)
Stores provided key and value to the localStorage  
You can update key/value content by storing again with the same key
- key - `string` key for the value you want to store
- value - value to be stored as `string`

### getFromLocal(key)
Retrieves value from provided key from the localStorage  
Returns the value as a `string`
- key - `string` key of the value you want to retrieve

### removeFromLocal(key)
Removes provided key and associated value from localStorage  
You can update key/value content by storing again with the same key, so removal is not neccessary for updating stored values
- key - `string` key of the value you want to remove

### storeArrayToLocal(key, array)
Stores provided key and array to the localStorage  
The array is stored after undergoing JSON.stringify()
- key - `string` key for array you want to store
- array - `array` to store

### getArrayFromLocal(key)
Retrives array from storage from provided key  
Use only when you know the value was stored as an array that underwent JSON.stringify() 
Returns value as an `array`, after an internal JSON.parse()
- key - `string` key for array you want to store

## useWebStorage Example Implementation
See `src/functionality/BookmarkHooks.js` or `src/components/complete/Alerts.js` for a working usage of the useWebStorage hook
```JSX
// Import the hook
import { useWebStorage } from '.../functionality/WebStorageHooks.js';

let myComponent = props => {

    // Declare whatever functions you want to use from the hook
    const { storeToLocal, storeArrayToLocal, getArrayFromLocal, getFromLocal } = useWebStorage();
    
    // Now you can use storeToLocal(), storeArrayToLocal(), getArrayFromLocal(), getFromLocal() within the component

    // Button stores the key/value pair "test_store", "myValue" to localStorage when clicked
    return(
        <Button
            onClick={storeToLocal("test_store", "myValue")}
        >
        </Button>
    );
}

export myComponent;
```

# Additional Functionality
# PanelManager.js
This is used within `App.js` to manage the swapping of different panels.  
Relevant snippet from `App.js`
```JSX
...
    /**
     * 
     * @param {the id of the display to show} nextToDisplay 
     */
    chooseDisplay(nextToDisplay) {
        if (PanelManager.HasPanel(nextToDisplay)) {
            return PanelManager.GetPanel(nextToDisplay);
        }
        else {
            switch (nextToDisplay) {
                case 'mint':
                    return <Mint />;
                case 'market':
                    return <Market />;
                case 'wallet':
                    return <Wallet />;
                case 'more':
                    return <Panel><ModuleMenu selected={this.state.nextToDisplay} setNextPanel={this.setNextPanel.bind(this)} /></Panel>;
                case 'home':
                    return <HomePanel />
                case 'bookmarks':
                    return <Bookmarks />
                case 'alerts':
                    return <Alerts />
                default:
                    return <HomePanel />
            }
        }
    }
...
```

