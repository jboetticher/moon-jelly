# React Hooks
Moon Jelly comes with a variety of React Hooks for developers to use when adding on to the main extension or your own module.

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

# MintPageHooks.js

# WebStorageHooks.js

# Additional Functionality
# PanelManager.js
