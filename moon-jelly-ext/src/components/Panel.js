import React, { PureComponent } from 'react';

let Panel = props => {

    return (
        <div className={"defaultLabel " + props?.className}>
            {props.children}
        </div>
    );
}

export default Panel;