import React from "react";
import { TextField } from "@mui/material";
import CleaveInput from "./CleaveInput";

const InputTextMasked = (props: any) => {
    const { options, ...rest } = props;
    return (
        <TextField
            InputProps={{
                inputComponent: CleaveInput,
                inputProps: {
                    options,
                    "data-testid": props.name,
                },
            }}
            {...rest}
        />
    );
};

export default InputTextMasked;
