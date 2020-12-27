import React, { PureComponent } from 'react';
import './../styles/Header.css';
import { ReactComponent as Logo } from '@oceanprotocol/art/logo/logo-white.svg';
import { useOcean } from '@oceanprotocol/react';

let Header = props => {
    const network = useOcean()['config']['network'];

    return (
        <header className={"appHeader"}>
            <Logo /*onClick={this.props.nextDisplay.bind(this, 'home')}*/ />
            {/*<h3 className={"topLinks"}> MoonJelly v0.1</h3>*/}
            <div className={"topLinks"}> 
                <div className="headerTitle"> MoonJelly v0.1 </div>
                <div className="networkTitle"> Connected to: {network} </div> 
            </div>
            
        </header>
    )
}

export default Header
