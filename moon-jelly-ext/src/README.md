# App.js
`App.js` houses the Panel swapping system that displays the different pages seen in the extension.  
`Alerts`, `Bookmarks`, `Market`, `Mint`, `ModuleMenu`, and `Wallet` are all wrapped by the `Panel` component.  
For example, `src/components/complete/Bookmarks.js` is wrapped by a panel in it's return statement:
```JSX
return(
    <Panel>
        <MarketNavbar selected="bookmarks"/>
        <div className="mt-2"> Saved Bookmarks </div>
        
        {renderBookmarks()}

    </Panel>
);
```
The other pages are all similarly wrapped by the `Panel` component.  

NOTE: `ModuleMenu` may have an duplicate `Panel` wrapper on it (as well as potentially extraneous props), which should be looked into.  

## Network Control
Currently, Moon Jelly does not have auto-network switching capabilities to determine which Ocean Market network to query from or publish to.  
In order to run Moon Jelly on a certain network (ie Rinkeby or Mainnet), a state must be modified in `src/components/complete/App.js`  
```JSX
...
let [network, infuraId] = ['mainnet', "92722306e5f042e6af0e80e253125972"];
//let [network, infuraId] = ['rinkeby', "92722306e5f042e6af0e80e253125972"];
...
```
This will hopefully be changed in the future as open-source development continues.  

Extra note: Unfortunately, a constant must also be modified within `public/alertsPage.js` to tell it whether it which network it should be querying for new assets.
```JSX
// CONTROLS THE NETWORK THE ALERT SYSTEM IS ON
//const network = 'mainnet';
const network = 'rinkeby';
```
This is due to the limitation that the chrome extension background script is currently written in pure javascript and seems unable to utilize any React hooks that would allow us to decide which network we are on. This is likely to be changed in the future, and any suggestions/changes for a better system are greatly appreciated.  

## Panel Swapping Breakdown
Within `App.js`, this snippet of code controls the logic for `Panel` swapping, based on the usage of React `Context`:
```JSX
...
export const PanelContext = React.createContext();
...
class App extends Component {
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
                    // questionable redundancy in panel wrapping here, will likely be cleaned up
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

    /**
     * Sets the id of the next panel.
     * @param {"id of the panel to change to"} nextPanel 
     */
    setNextPanel(nextPanel, response) {
        this.setState({ nextToDisplay: nextPanel }, response);
    }
...
}
...
```
Most importantly, other React components within the extension can tell `App.js` to switch to a certain Panel via the `Context`  

Example implementation:
```JSX
import { PanelContext } from '../../App.js';

let myComponent = props => {

    const goToPage = useContext(PanelContext);
    
    // clicking the button will tell App.js to swap to the Wallet Panel
    return(
        <Button
            onClick={goToPage("wallet", () => {
                console.log("Swapped to wallet page");
            })}
        >
        </Button>
    );
}

export myComponent;
```
Further usage of `Context` to swap Panels can be seen in:  
`src/module/slate_module/SlateFetch.js`  
`src/components/complete/App.js`, more specifically, the `HomePanel` component within it

