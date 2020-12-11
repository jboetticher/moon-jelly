import React, { PureComponent } from 'react';

let Panel = props => {

    return (
        <div className="defaultLabel">
            {props.children}
        </div>
    );
}

export default Panel;