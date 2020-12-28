# React Hooks
Moon Jelly comes with a variety of React Hooks for developers to use when adding on to the main extension or your own module.

## BookmarkHooks.js
Add, remove, and get bookmarks from Window.localStorage.

Bookmarks are stored as "bookmarks_network" in localStorage (ie "bookmarks_mainnet", "bookmarks_rinkeby") and contain a stringified array of datatoken asset DIDs.  

Window.localStorage can be viewed in `Application > Local Storage` of the Chrome developer console.

### useBookmarks
#### addBookmark(didToAdd)
Adds the given datatoken DID into "bookmarks_network" in Window.localStorage

#### removeBookmark(didToRemove)
Removes the given datatoken DID into "bookmarks_network" in Window.localStorage

#### getBookmarks()
Returns an array of datatoken DIDs retrived from "bookmarks_network" of Window.localStorage

### Example Implementation
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

## CustomOceanHooks.js



## MarketPageHooks.js

## MintPageHooks.js

## WebStorageHooks.js

# Additional Functionality
## PanelManager.js
