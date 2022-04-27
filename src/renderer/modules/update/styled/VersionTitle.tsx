import { styled, Typography, TypographyProps } from "@mui/material";

export default styled((props: TypographyProps) => 
    <Typography variant="h6" {...props}/>
)({ marginTop: "20px" });
