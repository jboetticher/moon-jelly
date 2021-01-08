# moon-jelly :hibiscus:
A chromium browser extension to help with publishing and accessing the ocean protocol & market. 
This project is meant to be a primary solution to anyone who wants to create an ocean-oriented chrome extension.
Expands off of the Jellyfish extension by Dhaval Kalavadiya.

## Installation :fish:
Installation is quite easy. Once you clone the repository, simply run:
`npm install`  
This will install all of the required node packages for you to continue.  

To start up the developer instance, run:
`npm run start`  

To create your own build, run:
`npm run build`  

This builds the extension into the `moon-jelly-ext/build` folder  

From here, the build folder can be loaded as an unpacked extension into a Chromium-based browser*.  
Short video for installing on [Google Chrome](https://www.youtube.com/watch?v=oswjtLwCUqg).  

*Please note that the extension was developed and tested mainly on Google Chrome. If a you run into a browser-specific problem, we encourage you to open an issue or propose a fix. 

### Quicker Installation and Testing :whale:
1. Download either `moon-jelly-v0.1.1.zip` or `moonjelly-rinkbey-v0.1.1.zip` (configured for mainnet or rinkeby, respectively)  
2. Extract the .zip file
3. From here, the extracted folder can be loaded as an unpacked extension into a Chromium-based browser.  
    Short video for installing on [Google Chrome](https://www.youtube.com/watch?v=oswjtLwCUqg).  
4. If you are frequently testing on different networks, Dev Console > Application > Local Storage > Clear All (button next to Filter) will clear all saved data, which includes wallet id, bookmarks, and alerts.

Notes for testing the extension:
- `moon-jelly-v0.1.1.zip` queries and publishes on the Etherium Mainnet
- `moonjelly-rinkbey-v0.1.1.zip` queries and publishes on the Rinkeby Test Network
- The alert system queries the Ocean Market (via Aquarius) passively every hour (based on chrome alarm system)
- The alert system also fetches on onInstalled (the extension is installed / the directory is refreshed) and onStartup (opening the web browser)
    - This may be changed in the future to also query from Aquarius when the extension popup opens (currently not implemented)

## Features :fishing_pole_and_fish:
- Mint Page: publish assets to the ocean market on this page.
- Market Page: search & bookmark datasets on the ocean market.
- Alerts: set keywords for datasets and get alerted when new datasets appear!
- Modules: open-source developers can add new modules to the extension to further extend its functionality. Each module can be disabled and enabled by the user.

## Modules :whale2:
The extension popup of the project is built with React whereas the rest of the chrome functionality is (currently) in vanilla javascript. While React is here to stay, other libraries may be added over time.
Open source contributors are encouraged to add React components, fix styling issues, add useful hooks, and improve the flow of the current primary panels. However, if you desire to add your own functionality, then you should create your own module.
Go to the [modules folder](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/modules) if you want to see the workflow and an example.

## Helping Out :tropical_fish:
There are many ideas that are thrown out simply because there isn't enough time or because some contributors may not have the technical know-how to do it effectively. If you want to help tackle any issues or even add your own ideas, the Projects tab of github is a nice place to start.
Feel free to make a new fork, and communicate with us about potential pull requests on the Ocean Discord Channel. If you want to be added as a contributor and work off of a branch, then you can message us there as well.

## Documentation :water_buffalo:
- [Modules Quickstart](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/modules)
- [React Hooks](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality)
- [Network Control](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src#network-control)
- [Panel System](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src#appjs)
- [Panel Swapping](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src#panel-swapping-breakdown)

