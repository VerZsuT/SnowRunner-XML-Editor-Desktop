import { Checkbox, CheckboxProps, styled } from "@mui/material";

export default styled((props: CheckboxProps) => 
    <Checkbox size="small" {...props}/>
)({
    position: "absolute",
    right: "37px",
    top: "5px"
});
