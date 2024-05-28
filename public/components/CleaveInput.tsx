import React from 'react';
import Cleave from 'cleave.js/react';

const CleaveInput = React.forwardRef((props: any, ref: any) => {
    const { inputRef, ...other } = props;
    return <Cleave {...other} htmlRef={ref} />;
});

CleaveInput.displayName = 'CleaveInput';

export default CleaveInput;