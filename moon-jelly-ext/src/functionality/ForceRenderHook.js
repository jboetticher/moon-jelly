import React, { useState } from 'react';

function useForceUpdate() {
    const [forceUpdateValue, setForceUpdateValue] = useState(0); // integer state
    return () => setForceUpdateValue(forceUpdateValue => ++forceUpdateValue); // update the state to force render
}

export { useForceUpdate };