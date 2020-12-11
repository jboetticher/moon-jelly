import React, { Component } from 'react';
import '../styles/Correct.css';

class Correct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadComplete: false,
            loaderClassname: 'circle-loader'
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.loadComplete !== prevState.loadComplete && nextProps.loadComplete) {
            return { loadComplete: nextProps.loadComplete, loaderClassname: 'circle-loader load-complete' };
        }
        else if (nextProps.loadComplete !== prevState.loadComplete && !nextProps.loadComplete) {
            return { loadComplete: nextProps.loadComplete, loaderClassname: 'circle-loader' };
        }
        else return null;
    }

    render() {
        return (
            <div className="checkmark-container">
                <div className={this.state.loaderClassname}>
                    {this.state.loadComplete
                        && this.state.loaderClassname == 'circle-loader load-complete' ?
                        (<div className="checkmark draw"></div>) : ""
                    }
                </div>
            </div>
        )
    }
}

export default Correct;