import { styled, TextField, TextFieldProps } from "@mui/material";

export default styled((props: TextFieldProps) =>
    <TextField type="number" size="small" {...props}/>
)({
    width: "80px",
    marginRight: "10px"
});
