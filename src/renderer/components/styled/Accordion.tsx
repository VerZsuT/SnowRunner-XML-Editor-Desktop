import { styled, Accordion as MuiAccordion } from "@mui/material";
import boxShadow2 from "./boxShadow";

export default styled(MuiAccordion)({
    boxShadow: boxShadow2,
    "&:before": { display: "none" }
});
