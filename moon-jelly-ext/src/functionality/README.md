# React Hooks
Moon Jelly comes with a variety of React Hooks for developers to use when adding on to the main extension or your own module.
- Bookmark Hooks
    - useBookmarks  
        - addBookmark
        - removeBookmark
        - getBookmarks
    
- Custom Ocean Hooks
    - useWalletReady  
    
    - useAquariusFetch  
        - fetchDataBySearchterm
        - fetchDataByWallet
        - fetchDataBySort
        - fetchDDO
    
- Market Page Hooks
    - useMarketPage  
        - isMarketPageOpen
        - insertSearchTerm
    
- Mint Page Hooks
    - useMintPage  
        - isMintPageOpen
        - insertAssetName
        - insertURL
        - insertAuthorName
        - insertDescription
        - insertMetaData
    
- Web Storage Hooks
    - useWebStorage  
        - storageAvailable
        - storeToLocal
        - getFromLocal 
        - removeFromLocal
        - storeArrayToLocal
        - getArrayFromLocal

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

## useWalletReady Example Implementation

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

### isMarketPageOpen
Checks if the Market search page is open  
Returns `true` or `false`

### insertSearchTerm
Inserts the the search term into the search input of the market page, then searches and displays results  
*User must be on the search page for insertSearchTerm to work  

The implementation of this function uses a setTimeout() currently as a workaround, and fixes to it would be appreciated 
- term - `string` text what the search bar should have

## useMarketPage Example Implementation

# MintPageHooks.js
## useMintPage
Functions to help interact and send data to the Mint page.

### isMintPageOpen
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

# Additional Functionality
# PanelManager.js
