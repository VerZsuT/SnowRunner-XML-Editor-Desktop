import { TextFieldProps, styled, TextField as MuiTextField } from "@mui/material";

export default styled((props: TextFieldProps) => (
    <MuiTextField size="small" {...props} />
))({ width: "100px" });
