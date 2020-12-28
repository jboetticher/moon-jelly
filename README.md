# moon-jelly
A chromium browser extension to help with publishing and accessing the ocean protocol & market. 
This project is meant to be a primary solution to anyone who wants to create an ocean-oriented chrome extension.
Expands off of the Jellyfish extension by Dhaval Kalavadiya.

## Installation
Installation is quite easy. Once you clone the repository, simply run:
`npm install`
This will install all of the required node packages for you to continue.
To start up the developer instance, run:
`npm run start`

## Features
- Mint Page: publish assets to the ocean market on this page.
- Market Page: search & bookmark datasets on the ocean market.
- Alerts: set keywords for datasets and get alerted when new datasets appear!
- Modules: open-source developers can add new modules to the extension to further extend its functionality. Each module can be disabled and enabled by the user.

## Modules
The extension popup of the project is built with React whereas the rest of the chrome functionality is (currently) in vanilla javascript. While React is here to stay, other libraries may be added over time.
Open source contributors are encouraged to add React components, fix styling issues, add useful hooks, and improve the flow of the current primary panels. However, if you desire to add your own functionality, then you should create your own module.
Go to the [modules folder](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/modules) if you want to see the workflow and an example.

## Helping Out
There are many ideas that are thrown out simply because there isn't enough time or because some contributors may not have the technical know-how to do it effectively. If you want to help tackle any issues or even add your own ideas, the Projects tab of github is a nice place to start.
Feel free to make a new branch, and communicate with us about potential pull requests on the Ocean Discord Channel.

## Documentation
- [React Hooks](https://github.com/jboetticher/moon-jelly/tree/main/moon-jelly-ext/src/functionality)
