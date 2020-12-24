import { Logger } from '@oceanprotocol/lib';

function useWebStorage() {

    /**
     * Function to check if a certain webstorage type is availiable
     * From mozilla docs
     * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
     * @param {"type of webstorage to access, typically 'localStorage' "} type
     */
    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    /**
     * Stores provided key and value to the localStorage
     * Value is stored as a string in localStorage
     * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Setting_values_in_storage
     * @param {"key for the value you want to store"} key
     * @param {"value to be stored (stored as a string)"} value
     */
    function storeToLocal(key, value) {
        if (storageAvailable('localStorage')) {

            localStorage.setItem(key, value);

            //console.log("stored", localStorage.getItem(key));
        }
        else {
            Logger.log("storeToLocal could not access localStorage");
        }
    }

    /**
     * Stores provided key and value to the localStorage
     * Returns the value as a string
     * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Getting_values_from_storage
     * @param {"key for the value you want to store"} key
     * @returns {"value as a string"}
     */
    function getFromLocal(key) {
        if (storageAvailable('localStorage')) {

            let val = localStorage.getItem(key);

            //console.log("retrieved", val);

            return val;
        }
        else {
            Logger.log("getFromLocal could not access localStorage");
            return "";
        }
    }

    /**
     * Removes provided key and associated value from localStorage
     * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Setting_values_in_storage
     * @param {"key you want to remove"} key
     */
    function removeFromLocal(key) {
        if (storageAvailable('localStorage')) {

            let val = localStorage.removeItem(key);

            return val;
        }
        else {
            Logger.log("removeFromLocal could not access localStorage");
            return "";
        }
    }

    return { storageAvailable, storeToLocal, getFromLocal, removeFromLocal };
}

export { useWebStorage };

