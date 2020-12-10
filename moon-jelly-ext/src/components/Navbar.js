import React, { PureComponent } from 'react';

export default class Navbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <header style={{display: "flex"}}>
                <div>Mint</div>
                <div>Search</div>
                <div>Analyze</div>
                <div>More</div>
            </header>
        )
    }
}
